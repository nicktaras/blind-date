import React, { Component } from 'react';
import Web3 from 'web3';
import BlindDate from './../build/contracts/BlindDate.json';
import './App.css';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      account: 'undefined',
      contract: null,
      profile: false,
      dates: []
    }
  }

  // load web3 on mount of react component
  async componentDidMount() {
    await this.loadWeb3()
  }

  // load data from blockchain related to users wallet address
  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      this.loadBlockChainData();
    } else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      this.loadBlockChainData();
    } else {
      window.alert('ethereum is not available.');
    }
  }

  async loadBlockChainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0]});
    console.log('acc', accounts);
    const networkId = 5777;
    // const networkId = 3; // ropsten or for localhost use 5777;
    // TODO await web3.eth.net.getId();
    const networkData = BlindDate.networks[networkId];
    if(networkData){
      const abi = BlindDate.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      this.setState({ contract });

      // get profile
      const profile = await contract.methods.getProfile(this.state.account).call();
      if(profile) {
        // add date info:
        const dates = await Promise.all(profile.dates.map((dateIndex) => {
          return contract.methods.getDate(Number(dateIndex)).call();
        }));
        this.setState({ profile, dates });
      }

      // we can use this to list all profiles inside the Dapp.
      const profiles = await contract.methods.getAllProfiles().call();
      if(profiles){
        var results = await Promise.all(profiles.map(async (item) => {
          return contract.methods.getProfile(item).call();
        }));
        var resultsOutput = results.filter(function (_profile) {
          return _profile.name !== profile.name;
        });
        this.setState({ profiles: resultsOutput });
      }

    }
  }

  async deactivate () {
    const _deactivate = await this.state.contract.methods.deactivateAccount();
    console.log(_deactivate);
  }
  
  async sendMockMessage (dateIndex, msg) {
    const _sendMockMessage = await this.state.contract.methods.sendMessage(Number(dateIndex), msg);
    console.log(_sendMockMessage);
  }

  async updateProfile () {
    const _updateProfile = await this.state.contract.methods.updateProfile(
        'https://lh3.googleusercontent.com/rRpw4UG8rR7xIxAsxmogLClQjISJ6Xi2l6DtWx1zVVgEJAVIAlSYd3WsMk_a3P25YQMKIv8MqVCRjMdBPmgqh0ubpOZOj2KokkCD=w366',
        'CyberPunk2000',
        1,
        1,
        'china',
        1,
        [0, 1, 2, 3, 4]
    );
    console.log(_updateProfile);
  }

  // send profile as param
  createProfile = (mockVersion) => {
    if(mockVersion === 'a'){
      this.state.contract.methods.addProfile(
        this.state.account,
        'https://lh3.googleusercontent.com/rRpw4UG8rR7xIxAsxmogLClQjISJ6Xi2l6DtWx1zVVgEJAVIAlSYd3WsMk_a3P25YQMKIv8MqVCRjMdBPmgqh0ubpOZOj2KokkCD=w366',
        'CyberPunk001',
        1,
        1,
        'china',
        1,
        [0, 1, 2, 3, 4]
      )
      .send({ from: this.state.account })
      .once('transactionHash', (hash) => { 
        console.log('hash', hash);
      })
      .once('receipt', (receipt) => { 
        console.log('receipt ', receipt);
      })
      .on('confirmation', (confNumber, receipt) => { 
        console.log('confirmation ', confNumber, receipt);
       })
      .on('error', (error) => { 
        console.log('err', error);
      })
      .then((profile) => {
        this.setState({ profile: [
          this.state.account,
          'https://lh3.googleusercontent.com/rRpw4UG8rR7xIxAsxmogLClQjISJ6Xi2l6DtWx1zVVgEJAVIAlSYd3WsMk_a3P25YQMKIv8MqVCRjMdBPmgqh0ubpOZOj2KokkCD=w366',
          'CyberPunk001',
          1,
          1,
          'china',
          1,
          [0, 1, 2, 3, 4]
        ] });
      });
    } else if(mockVersion === 'b'){
      this.state.contract.methods.addProfile(
        this.state.account,
        'https://storage.opensea.io/0x06012c8cf97bead5deae237070f9587f8e7a266d/381042-1555382669.png',
        'PurpleKitty23',
        1,
        1,
        'australia',
        1,
        [0, 1, 2, 3, 4]
      ).send({ from: this.state.account })
      .once('transactionHash', (hash) => { 
        console.log('hash', hash);
      })
      .once('receipt', (receipt) => { 
        console.log('receipt ', receipt);
      })
      .on('confirmation', (confNumber, receipt) => { 
        console.log('confirmation ', confNumber, receipt);
       })
      .on('error', (error) => { 
        console.log('err', error);
       })
      .then((profile) => {
        this.setState({ profile: {
          active: true,
          ageRange: 1,
          dates: [],
          disputeCount: 0,
          location: 'australia',
          name: 'PurpleKitty23',
          nftImage: 'https://storage.opensea.io/0x06012c8cf97bead5deae237070f9587f8e7a266d/381042-1555382669.png',
          preference: 1,
          sex: 1
        }});
      });
    } else {
      this.state.contract.methods.addProfile(
        this.state.account,
        'https://lh3.googleusercontent.com/8uYD1TXbipMuoithFNkQfLXqZKMbVH8kNeyt8FUPkcQtFjRfhWwTDqHbCdnTizFnF02uhdKGNRPovrXcdoAUk1GksHMb8SmJpdEIRw=w318',
        'WinterL234',
        1,
        1,
        'russia',
        1,
        [0, 1, 2, 3, 4]
      ).send({ from: this.state.account })
      .once('transactionHash', (hash) => { 
        console.log('hash', hash);
      })
      .once('receipt', (receipt) => { 
        console.log('receipt ', receipt);
      })
      .on('confirmation', (confNumber, receipt) => { 
        console.log('confirmation ', confNumber, receipt);
       })
      .on('error', (error) => { 
        console.log('err', error);
       })
       .then((profile) => {
        this.setState({ profile: {
          active: true,
          ageRange: "1",
          dates: [],
          disputeCount: "0",
          location: "russia",
          name: "WinterL234",
          nftImage: "https://lh3.googleusercontent.com/8uYD1TXbipMuoithFNkQfLXqZKMbVH8kNeyt8FUPkcQtFjRfhWwTDqHbCdnTizFnF02uhdKGNRPovrXcdoAUk1GksHMb8SmJpdEIRw=w318",
          preference: "1",
          sex: "1"
        }});
      });
    }
  }
  addDate = (date, msg) => {
    this.state.contract.methods.addDate(
      date,
      msg
    )
    .send({ from: this.state.account })
    .once('transactionHash', (hash) => { 
      console.log('hash', hash);
    })
    .once('receipt', (receipt) => { 
      console.log('receipt ', receipt);
    })
    .on('confirmation', (confNumber, receipt) => { 
      console.log('confirmation ', confNumber, receipt);
     })
    .on('error', (error) => { 
      console.log('err', error);
     })
    .then(() => {
      this.setState({ dates: [...this.state.dates, { date, msg }] });
    });
  }

  datesMarkup = (date, index) => { 
    var output = "";
    output += `<p>Date: ${index}`;
    if(date.messagesListSender){
      date.messagesListSender.map((msg, i) => {
        output += `
            <p>From: ${date.messagesListSender[i]}</p>
            <p>${date.messagesList[i]}</p>
        `;
      });
    }
    output += `</p>`;
    return output;
  };
  
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark p-0 shadow">
          <div>
            <a
              className="navbar-brand col-sm-3 col-md-4 mr-0"
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              Blind Date
            </a>
          </div>
        </nav>
        <div style={{ padding: '5px', margin: '20px', border: '1px solid black' }}>
          <p><small>Adds mock profile to dapp (generate on 2 different addresses)</small></p>
          <p><button onClick={e => this.createProfile("a")}>Add Mock Profile A</button></p> 
          <p><button onClick={e => this.createProfile("b")}>Add Mock Profile B</button></p>
          <p><button onClick={e => this.createProfile("c")}>Add Mock Profile C</button></p>
        </div>
        { this.state.profile.active &&
          <div style={{ padding: '5px', margin: '20px', border: '1px solid black' }}>
            <p>My Profile:</p>
            <div style={{ padding: '5px', margin: '20px', border: '1px solid black' }}>
              <img width="100px" src={ this.state.profile.nftImage }></img>
              <p>Status: { this.state.profile.active ? 'active' : 'deactivated' }</p>
              <p>Name: { this.state.profile.name }</p>
              <p>Age Range: { this.state.profile.ageRange }</p>
              <p>Location: { this.state.profile.location }</p>
              <p>Preference: { this.state.profile.preference }</p>
              <p>sex: { this.state.profile.sex }</p>
              </div>
              <p>Dates:</p>
              <div style={{ padding: '5px', margin: '20px', border: '1px solid black' }}>
                { 
                  this.state.dates.map((date, index) => {
                    return (
                      <div key={index}>
                        <div dangerouslySetInnerHTML={{__html: this.datesMarkup(date, index)}}></div>
                        <p>Send Message:</p>
                        <button onClick={e => this.sendMockMessage(date.id, 'Hey, I really like your profile name, what is the story behind it? Where abouts do you live in Russia?')}>Send Mock Reply Message</button>
                      </div>
                    )
                  })
                }
              </div>
              { this.state.profile.active === true &&
                <div>
                <p>Account:</p>
                <div style={{ padding: '5px', margin: '20px', border: '1px solid black' }}>
                  <button onClick={e => this.deactivate()}>Deactivate</button>
                  <button onClick={e => this.updateProfile()}>Update Profile</button>
                </div>
                </div>
              }
          </div> 
        }
        <div style={{ padding: '5px', margin: '20px', border: '1px solid black' }}>
          Find a date: { this.state.profiles.length === 0 && <small>No profiles found.</small> }
          <div>
            { this.state.profiles && this.state.profiles.map((p, i) => {
                return <div key={i}>
                 <div style={{ padding: '5px', margin: '20px', border: '1px solid black' }}>
                    <img width="100px" src={ p.nftImage }></img>
                    <div style={{ padding: '5px', margin: '12px 0' }}>
                      <p>Status: { p.active ? 'active' : 'deactivated' }</p>
                      <p>Name: { p.name }</p>
                      <p>Age Range: { p.ageRange }</p>
                      <p>Location: { p.location }</p>
                      <p>Preference: { p.preference }</p>
                      <p>sex: { p.sex }</p>
                    </div>
                    <div style={{ padding: '5px', margin: '20px', border: '1px solid black' }}>
                      <button onClick={e => this.addDate(p.addr, 'Hi there good lookin...')}>Connect</button> <input placeholder="Hi there!"></input>
                    </div>
                  </div> 
                </div>;
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
