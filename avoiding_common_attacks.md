
## Attack Vectors

#### SWC-131 - Presence of unused variables

Implementation added:

Removed all unused variables from the smart contract. 

#### SWC-129	- Typographical Error

Implementation added:

Correct usage of operators has been applied.

#### SWC-124 - Write to Arbitrary Storage Location 

Implementation added:

Upon creation of the smart contract, a variable 'owner' is used to store the creators/owners addreess.
This is used to ensure critical operations can not be used by anyone other than the owner. 

#### SWC-106 - Self Destruct

Remove self destruct function unless it is required.

#### SWC-100 - Function Default Visibility

- Applied External to all functions that are to be called externally.
- Applied Private to all functions that are to be called internally only.
- Applied Public to all functions that can be called internally or externally.
