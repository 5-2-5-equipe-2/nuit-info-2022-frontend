import * as React from "react";
import {
  useQuery,
  useQueryClient,
  QueryClient,
} from "react-query";
import Web3 from 'web3';
import MetaMaskOnboarding from '@metamask/onboarding';
import {Grid, Paper} from "@mui/material";
import {animated, useSpring} from "react-spring";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect';
const CONNECTED_TEXT = 'Connected';

const queryClient = new QueryClient();

export const  OnboardingButton = () => {
  const [keyBlock, setKeyBlock] = React.useState("");
  const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = React.useState(false);
  const [accounts, setAccounts] = React.useState([]);
  const onboarding = React.useRef();
  const web3 = new Web3(window.ethereum);
  const jsonABI=[{"inputs":[{"internalType":"address","name":"_who","type":"address"},{"internalType":"string","name":"_codeName","type":"string"}],"name":"addMember","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_key","type":"uint32"},{"internalType":"string","name":"_teamName","type":"string"}],"name":"claimKey","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_key","type":"uint32"},{"internalType":"int8","name":"_value","type":"int8"}],"name":"createKey","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_msg","type":"string"}],"name":"sendMessage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_codeName","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"members","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"messageCount","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"messages","outputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"string","name":"message","type":"string"}],"stateMutability":"view","type":"function"}];
  const secretContract = new web3.eth.Contract(jsonABI,"0x3210ecB7A8Ea2E6595BE559f215a1Ff98828DfF7");

  const web3Query = async() => {
    const msg=[];
    if(web3.utils.isAddress(accounts[0])){
      //web3.eth.getBalance(accounts[0]).then(console.log).catch(console.error);
      //secretContract.methods.messages(0).call().then(console.log).catch(console.error);
      const maxM = await secretContract.methods.messageCount().call();
      for(let i=0;i<maxM;i++){
        
        const message = await secretContract.methods.messages(i).call();
        const members = await secretContract.methods.members(message.sender).call();
        message["members"] = members;
        msg.push(message);
      }
    }

    return msg;
  };

  const addMember = async () => {
    const transactionParameters = {
      nonce: '0x00', // ignored by MetaMask
      gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
      gas: '0x2710', // customizable by user during MetaMask confirmation.
      to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
      from: "0x3210ecB7A8Ea2E6595BE559f215a1Ff98828DfF7", // must match user's active address.
      value: '0x00', // Only required to send ether to the recipient from the initiating external account.
      data: secretContract.methods.addMember("0x95A042aa7Af43df6eAA447B09E5F47a2D9CED8Ad","T1Time").encodeABI(), // Optional, but used for defining smart contract creation and interaction.
      chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };
    
    // txHash is a hex string
    // As with any RPC call, it may throw an error
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    console.log(txHash);
  };

  const sendKey = async (key) => {
    const transactionParameters = {
      nonce: '0x00', // ignored by MetaMask
      gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
      gas: '0x2710', // customizable by user during MetaMask confirmation.
      to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
      from: "0x3210ecB7A8Ea2E6595BE559f215a1Ff98828DfF7", // must match user's active address.
      value: '0x00', // Only required to send ether to the recipient from the initiating external account.
      data: secretContract.methods.claimKey(key,"5+2=5").encodeABI(), // Optional, but used for defining smart contract creation and interaction.
      chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };
    
    // txHash is a hex string
    // As with any RPC call, it may throw an error
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    console.log(txHash);
  };

  const queryClient = useQueryClient();
  const { status, data, error, isFetching }  = useQuery('todos',web3Query,{refetchInterval:1000});

  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  React.useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  React.useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts);
      window.ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        window.ethereum.removeListener('accountsChanged', handleNewAccounts);
      };
    }
  }, []);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts) => setAccounts(newAccounts));
    } else {
      onboarding.current.startOnboarding();
    }
  };

  const styles = useSpring({
    from: {opacity: 0, transform: "translate3d(0,-40px,0)"},
    to: {opacity: 1, transform: "translate3d(0,0px,0)"},
    config: {
        tension: 280,
        friction: 60
    }
});

const handleText = (e) => {
    setKeyBlock(e.target.value);
};

  return (
    <animated.div style={styles}>

    <Grid container justifyContent="center" alignItems="center" direction={"column"}>

        <Grid item>
            <Paper elevation={3} sx={{width: "100%", maxWidth: "500px"}}>
                <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"}>
                    <Grid item>
                    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Sender Address</TableCell>
            <TableCell align="center">Sender Name</TableCell>
            <TableCell align="center">Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.sender}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
                {row.sender}
              </TableCell>
              <TableCell align="center">
                {row.members}
              </TableCell>
              <TableCell align="center">{row.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                    </Grid>
                </Grid>
            </Paper>
            <TextField value={keyBlock} onChange={handleText} id="outlined-basic" label="Clé" variant="outlined" />
            <Button
  onClick={() => {
    sendKey(keyBlock);
  }}
>
  Click me
</Button>
<Button
  onClick={() => {
    onClick();
  }}
>
 Connect
</Button>
        </Grid>

    </Grid>
</animated.div>
  );
};