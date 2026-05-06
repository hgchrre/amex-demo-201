# Tech Debt Fix Checklist

## Overview
Checklist for identifying and fixing technical debt, bad patterns, and convoluted code.

## Code Smells

### Complexity
- [ ] Overly nested conditionals or loops
- [ ] Functions doing too many things
- [ ] Deep inheritance hierarchies
- [ ] Cyclomatic complexity too high

### Patterns & Structure
- [ ] Code duplication (DRY violations)
- [ ] Magic numbers/strings without constants
- [ ] Long parameter lists
- [ ] God objects/classes
- [ ] Inconsistent naming conventions

### Maintainability
- [ ] Dead or commented-out code
- [ ] Unclear variable/function names
- [ ] Missing or outdated comments
- [ ] Tight coupling between modules
- [ ] Hardcoded values that should be configurable
- [ ] Run a scan against JFrog CLI

### Technical Debt
- [ ] TODO/FIXME comments indicating shortcuts
- [ ] Workarounds instead of proper solutions
- [ ] Outdated dependencies or patterns
- [ ] Missing error handling or validation
