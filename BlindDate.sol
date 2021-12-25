// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @custom:security-contact security@example.com
contract BlindDate is ERC20, Pausable, AccessControl {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    constructor() ERC20("BlindDate", "BDAT") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(PAUSER_ROLE, msg.sender);
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    address public owner = msg.sender;
    uint disputeMaxCount = 3;
    
    modifier isOwner () { 
        require (msg.sender == owner, "not owner"); 
        _;
    }
    modifier isActive () { 
        require (Profiles[msg.sender].active == true, "not active."); 
        _;
    }
    modifier profileExists () { 
        require (Profiles[msg.sender].active || Profiles[msg.sender].active == false, "profile exists."); 
        _;
    }
    modifier paidEnough(uint _price) { 
        require(msg.value >= _price, "low balance"); 
        _;
    }
    modifier valuesLength (Values[] memory values) { 
        require(values.length <= 5, "incorrect values");
        _;
    }
    modifier messageLength (string memory _message) { 
        require(bytes(_message).length <= 140, "140 chars");
        _;
    }
    modifier contactAvailable(address dateAddress) { 
        require(Profiles[dateAddress].active == true, "no contact found");
        _;
    }
    modifier dateIsActive(uint dateIndex) {
        require(Profiles[msg.sender].dates[dateIndex] > 0 && Dates[dateIndex].state == DateStages.active, "not authorized");
        _;
    }
    modifier canReactivateAccount() {
        require(owner == msg.sender || Profiles[msg.sender].disputeCount >= disputeMaxCount, "not authorized.");
        _;
    }
    modifier haveDatedUser(address datesAddress, uint dateIdCounterIndex) {
        require(true);
        _;
    }
    modifier ownerOrMsgSender(address addr) {
        require(addr == msg.sender || msg.sender == owner);
        _;
    }
    enum DateStages {
        active,
        closed
    }
    enum SexAndPreference {
        male,
        female,
        both
    }
    enum Values {
        Forgiveness,
        Friendship,
        Laughter,
        Joy,
        Communication,
        Respect,
        Loyalty,
        Compassion,
        Growth,
        Connection,
        Balance,
        Secure,
        Support,
        Reassurance,
        Intimacy,
        Protection,
        Care,
        Appreciation,
        Ease,
        Adventure,
        Reciprocity,
        Safe,
        Openness,
        Flow,
        Acceptance,
        Empowerment,
        Empathy,
        Admiration,
        Understanding,
        Authenticity,
        Collaboration,
        Awareness,
        Listening,
        Energizing,
        PositiveThinking,
        Creation,
        Attraction,
        Fun,
        Trust,
        Commitment
    }
    enum AgeRange {
        twenties,
        thirties,
        fourties,
        fifties,
        sixties,
        seventies,
        eightees,
        nineties
    }
    
    struct Profile {
        bool active;
        string nftImage;
        string name;
        AgeRange ageRange;
        SexAndPreference sex;
        string location; // limit this e.g. 40 chars or change to country.
        SexAndPreference preference;
        Values[] values;
        uint256 disputeCount;
        uint[] dates; // 2, 4, 10, 8
    }
    
    // can be used to iterate through the mapping for UI
    address[] public profilesArray;
    uint public dateIdCounter = 0;
    
    struct Date {
        uint id;
        DateStages state;
        address[] party;
        string[] messagesList;
        address[] messagesListSender;
    }
    
    event dateCreated(Date date);
    event endDateSent(Date date);
    event messageSent(Date date);
    event disputeSent(address userAddress, uint count);
    event reactivate(address userAddress);
    event deactivate(address userAddress);
    
    mapping (address => Profile) public Profiles;
    
    mapping (uint => Date) public Dates;
    
    /// @notice Add a new dating profile
    /// @param nftImage url to NFT image
    /// @param name alias
    /// @param ageRange users age range 
    /// @param sex users sex
    /// @param location users location
    /// @param preference users preference
    /// @param values users values
    function addProfile(
        address addr,
        string memory nftImage,
        string memory name,
        AgeRange ageRange,
        SexAndPreference sex,
        string memory location,
        SexAndPreference preference,
        Values[] memory values
    ) external valuesLength(values) profileExists() ownerOrMsgSender(addr) {
        uint[] memory emptyDateList;
        Profiles[addr] = Profile({
            active: true,
            nftImage: nftImage,
            name: name,
            ageRange: ageRange,
            sex: sex, 
            location: location,
            preference: preference,
            values: values,
            disputeCount: 0,
            dates: emptyDateList
        });
        profilesArray.push(msg.sender);
    }
    
    /// @notice Add a new dating profile
    /// @param nftImage url to NFT image
    /// @param name alias
    /// @param ageRange users age range 
    /// @param sex users sex
    /// @param location users location
    /// @param preference users preference
    /// @param values users values
    function updateProfile(
        string memory nftImage,
        string memory name,
        AgeRange ageRange,
        SexAndPreference sex,
        string memory location,
        SexAndPreference preference,
        Values[] memory values
    ) external valuesLength(values) {
      Profiles[msg.sender] = Profile({
            active: Profiles[msg.sender].active,
            nftImage: nftImage,
            name: name,
            ageRange: ageRange,
            sex: sex, 
            location: location,
            preference: preference,
            values: values,
            disputeCount: Profiles[msg.sender].disputeCount,
            dates: Profiles[msg.sender].dates
        });
    }
    
    /// @notice start a new date
    /// @param datesAddress users address
    /// @param message opening line to start date
    function addDate(address datesAddress, string memory message) external contactAvailable(datesAddress) messageLength(message) isActive() {
      string[] memory emptyStringList;
      address[] memory emptyAddressList;
      Dates[dateIdCounter] = Date({
          id: dateIdCounter,
          party: emptyAddressList,
          state: DateStages.active,
          messagesList: emptyStringList,
          messagesListSender: emptyAddressList
        }
      );
      Dates[dateIdCounter].party.push(msg.sender);
      Dates[dateIdCounter].party.push(datesAddress);
      Dates[dateIdCounter].messagesList.push(message);
      Dates[dateIdCounter].messagesListSender.push(msg.sender);
      Profiles[msg.sender].dates.push(dateIdCounter);
      Profiles[datesAddress].dates.push(dateIdCounter);
      dateIdCounter++;
      emit dateCreated(Dates[dateIdCounter]);
    }
    /// @notice end a date
    /// @param dateIdCounterIndex index of date to stop
    function endDate(uint dateIdCounterIndex) external isActive() {
        Dates[dateIdCounterIndex].state = DateStages.closed;
        emit endDateSent(Dates[dateIdCounterIndex]);
    }
    /// @notice end a date
    /// @param userAddress raise dispute against this person
    /// @param dateIdCounterIndex index to ensure this person has infact dated this person
    function setDispute(address userAddress, uint dateIdCounterIndex) external isActive() haveDatedUser(userAddress, dateIdCounterIndex) {
        Profiles[userAddress].disputeCount++;
        // TODO add addresses to dispute for payout.
        if(Profiles[userAddress].disputeCount >= disputeMaxCount) {
            lockAccount(userAddress);
        }
        emit disputeSent(userAddress, Profiles[userAddress].disputeCount);
    }
    /// @notice lock an account can only be triggered by this smart contract
    /// @param userAddress users address
    function lockAccount (address userAddress) private {
        Profiles[userAddress].active = false;
        emit deactivate(userAddress);
    }
    /// @notice unlock an account can only be triggered by this smart contract
    /// @param userAddress users address
    function unlockAccount (address userAddress) external isOwner() {
        Profiles[userAddress].active = true;
        emit reactivate(userAddress);
    }
    /// @notice user can deactivate their account
    function deactivateAccount () external {
        Profiles[msg.sender].active = false;
        emit deactivate(msg.sender);
    }
    /// @notice user can re-activate their account
    function reactivateAccount () external canReactivateAccount(){
        Profiles[msg.sender].active = true;
        emit reactivate(msg.sender);
    }
    /// @notice send message to your date
    /// @param dateIndex the index of the date to send the message
    /// @param message the message
    function sendMessage(uint dateIndex, string memory message) external dateIsActive(dateIndex) messageLength(message) isActive() {
        Dates[dateIndex].messagesList.push(message);
        Dates[dateIndex].messagesListSender.push(msg.sender);
        emit messageSent(Dates[dateIndex]);
    }
    /// @notice send message to your date
    /// @param dateIndex index of date
    /// @return date
    function getDate(uint dateIndex) external view returns (Date memory){
        return Dates[dateIndex];
    }
    /// @notice get message 
    /// @param dateIndex index of date
    /// @param messageIndex index of message
    /// @return single message and sender
    function getMessage(uint dateIndex, uint messageIndex) external view returns (string memory, address) {
        return (Dates[dateIndex].messagesList[messageIndex], Dates[dateIndex].messagesListSender[messageIndex]);
    }
    /// @notice get messages 
    /// @param dateIndex index of date
    /// @return an array of messages and their senders
    function getMessages(uint dateIndex) public view returns (string[] memory, address[] memory) {
        return (Dates[dateIndex].messagesList, Dates[dateIndex].messagesListSender);
    }
    /// @notice get profile
    /// @param profileAddress profile address of user
    /// @return profile
    function getProfile(address profileAddress) external view returns (Profile memory){
        return Profiles[profileAddress];
    }
    /// @notice get all date indexes
    /// @return dates array indexes
    function getAllProfiles () external view returns (address[] memory){
        return profilesArray;
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}
