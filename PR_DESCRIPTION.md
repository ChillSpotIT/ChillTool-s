# Pull Request

## Title
feat: modular architecture and enhanced bypass mechanism (v4.0.3)

## Description

### Overview
Refactored monolithic codebase into modular architecture with separation of concerns and implemented enhanced bypass mechanism that circumvents platform restrictions without triggering detection.

### Changes

**Architecture:**
- Core modules: DOM manipulation, state management
- Feature modules: ban system, IP handling, country leaderboard, skip counter
- UI layer: modals, toolbar, themes, toast notifications
- Timer subsystem: session and video tab timers
- i18n: centralized translation management

**Bypass Mechanism:**
- DOM injection-based approach to bypass platform blocks
- Scripts execute in MAIN world context to avoid CSP violations
- Removed redundant permissions (minimal permission model)

**Build System:**
- Added esbuild-based bundler for production builds
- Source tree organized under `src/` with clear module boundaries
- Output directed to `dist/` for extension distribution

**Cleanup:**
- Removed legacy `umingle.js` (5236 lines) in favor of modular structure
- Added `.gitignore` for development artifacts
- Version bump to 4.0.3

### Technical Details
- Manifest V3 compliant
- Content scripts injected at `document_start`
- MAIN world execution context for DOM manipulation
- esbuild bundler for optimized output

### Testing
- [ ] Extension loads without errors
- [ ] Bypass mechanism functions correctly
- [ ] All UI modals render properly
- [ ] IP lookup works as expected
- [ ] Ban system operational
