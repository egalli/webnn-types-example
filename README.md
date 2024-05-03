# TypeScript Types Declarations for WebNN

This package contains the TypeScript type declaration (`.d.ts`) files for the [WebNN API](https://webmachinelearning.github.io/webnn/)

# Using Types

## Installing

> TODO: Add installations instructions once npm package has been created.

## Configuring

Since this package is outside of [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), the types won't be automatically picked up. The following is a list of ways to add it to type lookup.

> TODO: Add instructions for configuring `tsconfig.json`, Webpack, etc.

# Updating Types

1. Update WebNN specification under `spec`
2. Generate types with `npm run generate`
3. Manually update `webnn/index.d.ts` with changes from `generate/index.d.ts`. Note that there are intentional differences between the versions under `generate/` and `webnn/` (see next section).
4. Push changes to all files under `generated/` and `webnn/`.

## Intensional Differences Generated and Final Types
* The current version of the TypeScript types generator doesn't add return types for `new ()` on interfaces.
    * Currently only `MLGraphBuilder` needs to be updated 
        ```ts
        new (context: MLContext) : MLGraphBuilder;
        ```
* The `npu` device type has been added to `MLDeviceType` for performance and compliance testing.
* The experimental `MLBuffer` API has been added for exploration.