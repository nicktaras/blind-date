// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlindDateValues {

   enum DateStages {
      active,
      closed
   }
   enum SexAndPreference {
      male,
      female,
      either
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

   struct Profile {
        address addr;
        bool active;
        string nftImage;
        string name;
        AgeRange ageRange;
        SexAndPreference sex;
        string countryCode;
        SexAndPreference preference;
        Values[] values;
        uint256 disputeCount;
        uint[] dates;
    }
    
    address[] public profilesArray;
    uint public dateIdCounter = 0;
    
    struct Date {
        uint id;
        DateStages state;
        address[] party;
        string[] messagesList;
        address[] messagesListSender;
    }

}
