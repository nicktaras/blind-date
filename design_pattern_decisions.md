
## Design Patterns:

#### Inheritance and Interfaces (Importing and extending contracts and/or using contract interfaces) Inheritances and Interface

Implementation added:

Usage of OpenZeplin libraries.

#### Access Control Design Patterns (Restricting access to certain functions using things like Ownable, Role-based Control) Access Control Design Patterns

Implementation added:

- Applied External to all functions that are to be called externally.
- Applied Private to all functions that are to be called internally only.
- Applied Public to all functions that can be called internally or externally.

#### Optimizing Gas (Creating more efficient Solidity code) Optimizing Gas

Implementation added:

Usage of External rather than using Public to save gas. Solidity copies array arguments to memory, while external functions can read directly from calldata.

#### Use Modifiers Only for Validation

Implementation added:

Modifiers added to all functions. 
