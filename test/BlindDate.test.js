const BlindDate = artifacts.require('BlindDate');

// Checklist of methods:
// - addProfile (done)
// - updateProfile (done)
// - addDate (done)
// - getProfile (done)
// - getMessages (done)
// - getMessage (done)
// - getDate (done)
// - sendMessage (done)
// - endDate (not done)
// - setDispute (not done)
// - lockAccount (not done)
// - unlockAccount (not done)
// - getAllProfiles (not done)

// delegate roles
// _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
// _setupRole(PAUSER_ROLE, msg.sender);

const chai = require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('BlindDate', (accounts) => {

    let contract = null;

    before(async () => {
      contract = await BlindDate.deployed();
    })

    BlindDate.deployed().then((_instance) => { console.log(_instance) })

    describe('deployment', async () => {
      it('contract exists', async () => {
        assert.notEqual(BlindDate, null);
      });
      
      it('deployed successfully', async () => {
        const address = contract.address;
        assert.notEqual(address, null);
      });
      
      it('has a name', async () => {
        const name = await contract.name();
        assert.equal(name, 'BlindDate');
      });
      
      it('has a symbol', async () => {
        const symbol = await contract.symbol();
        assert.equal(symbol, 'BDAT');
      });

    });

    describe('profile settings', async () => {
      
      it('generate a new profile', async () => {
        const newProfile = await contract.addProfile(accounts[0],'xyz','cyberpunk',0,0,'Aus',0,[0, 1, 2, 3, 4]);
        assert.equal(newProfile.receipt.status, true);
      });

      it('decactivate profile', async () => {
        await contract.addProfile(accounts[0], 'xyz','cyberpunk',0,0,'Aus',0,[0, 1, 2, 3, 4]);
        await contract.deactivateAccount();
        const profile = await contract.getProfile(accounts[0]);
        assert.equal(profile.active, false);
      });

      it('update profile name', async () => {
        await contract.addProfile(accounts[0], 'xyz','cyberpunk',0,0,'Aus',0,[0, 1, 2, 3, 4]);
        await contract.updateProfile('xyz','cyberpunk2030',0,0,'Gre',0,[0, 1, 2, 3, 4]);
        const profile = await contract.getProfile(accounts[0]);
        assert.equal(profile.name, 'cyberpunk2030');
      });
      
      it('update profile countryCode', async () => {
        await contract.addProfile(accounts[0], 'xyz','cyberpunk',0,0,'Aus',0,[0, 1, 2, 3, 4]);
        await contract.updateProfile('xyz','cyberpunk',0,0,'Gre',0,[0, 1, 2, 3, 4]);
        const profile = await contract.getProfile(accounts[0]);
        assert.equal(profile.countryCode, 'Gre');
      });
      
      it('update profile image', async () => {
        await contract.addProfile(accounts[0], 'xyz','cyberpunk',0,0,'Aus',0,[0, 1, 2, 3, 4]);
        await contract.updateProfile('abc','cyberpunk',0,0,'Aus',0,[0, 1, 2, 3, 4]);
        const profile = await contract.getProfile(accounts[0]);
        assert.equal(profile.nftImage, 'abc');
      });

    });

    describe('profile methods', async () => {

      

      it('creates a new profile mapping', async () => {
        const newProfile = await contract.addProfile(accounts[0], 'xyz','cyberpunk',0,0,'Aus',0,[0, 1, 2, 3, 4]);
        const profile = await contract.getProfile(newProfile.receipt.from);
        assert.equal((profile) ? true : false, true);
      });
                  
      it('creates date', async () => {
        await contract.addProfile(accounts[0],'xyz','cyberpunk2030',0,0,'Gre',0,[0, 1, 2, 3, 4]);
        await contract.addProfile(accounts[1], 'xyz','cyberpunk',0,0,'Aus',0,[0, 1, 2, 3, 4]);
        await contract.addDate(accounts[1], 'Hi there');
        const getDate = await contract.getDate(0);
        assert.equal(getDate.id, 0);
      });

      it('creates date and sends a msg', async () => {
        await contract.addProfile(accounts[0],'xyz','cyberpunk2030',0,0,'Gre',0,[0, 1, 2, 3, 4]);
        await contract.addProfile(accounts[1], 'xyz','cyberpunk',0,0,'Aus',0,[0, 1, 2, 3, 4]);
        await contract.addDate(accounts[1], "Hi there");
        const getMessage = await contract.getMessage(0, 0);
        assert.equal(getMessage[0].toString(), 'Hi there');
        assert.equal(getMessage[1].toString(), (accounts[0]).toString());
      });
      
      it('creates date and sends a second msg', async () => {
        await contract.addProfile(accounts[0],'xyz','cyberpunk2030',0,0,'Gre',0,[0, 1, 2, 3, 4]);
        await contract.addProfile(accounts[1], 'xyz','cyberpunk',0,0,'Aus',0,[0, 1, 2, 3, 4]);
        await contract.addDate(accounts[1], "Hi there");
        await contract.sendMessage(0, "Hi");
        const getMessages = await contract.getMessages(0);
        assert.equal(getMessages[0].toString(), 'Hi there,Hi');
        assert.equal(getMessages[1].toString(), (accounts[0] + ',' + accounts[0]).toString());
      });
      
      // TODO Catch Error Given: 
      // Error: Returned error: VM Exception while processing transaction: revert message length too long -- Reason given: message length too long.
      it('creates date and fails to send a second msg', async () => {
        await contract.addProfile(accounts[0],'xyz','cyberpunk2030',0,0,'Gre',0,[0, 1, 2, 3, 4]);
        await contract.addProfile(accounts[1], 'xyz','cyberpunk',0,0,'Aus',0,[0, 1, 2, 3, 4]);
        await contract.addDate(accounts[1], "Hi there");
        await expect(await contract.sendMessage(0, "Although Ripple built few non-fungible token, Ravencoin froze many non-fungible token! Digitex Futures stuck lots of dump, however, they counted few shitcoin of some orphan! Since Zilliqa did many REKT for few digital signature, someone surrendered few bear trap in some pre-sale! Because Bitcoin Cash limited the hardware wallet until some escrow, ERC721 token standard thought lots of efficient coin until the whale, therefore, Zcash was the dormant ERC721 token standard until many 51% attack since Tezos thinking few directed acyclic graph after some airdrop! When Tether controls lots of considerable bag, Silk Road cost many side chain for some delegated proof-of-stake, for EOS mining the astroturfing since Satoshi Nakamoto cut off the permissioned ledger. Nexo specialises in few ashdraked after a dolphin.")).to.be.revertedWith("");
      });

      // TEST ME (with address that is not owner)
      // it('cant create two different accounts with the same sender address', async () => {
      //   const newProfile = await contract.addProfile('0x02e3118b168CcfD4Fb11F460cD50E53397E7Ee89','xyz','cyberpunk2030',0,0,'Greece',0,[0, 1, 2, 3, 4]);
      //   await contract.addProfile('0x02e3118b168CcfD4Fb11F460cD50E53397E7Ee89', 'xyz','cyberpunk',0,0,'Australia',0,[0, 1, 2, 3, 4]);
      //   const profile = await contract.getProfile(newProfile.receipt.from);
      //   assert.equal(profile.active, true);
      // });
   
    });

})