# Storybook Docs w/ CRA & TypeScript

This is a quick-and-dirty walkthrough to set up a fresh project with [Storybook Docs](https://medium.com/storybookjs/storybook-docspage-e185bc3622bf), Create React App, and TypeScript. If you're looking for a tutorial, please see [Design Systems for Developers](https://www.learnstorybook.com/design-systems-for-developers/), which goes into much more depth but does not use Typescript.

The purpose of this walkthrough is a streamlined Typescript / Docs setup that works out of the box, since there are countless permutations and variables which can influence docs features, such as source code display, docgen, and props tables.

## Step 1: Initialize CRA w/ TS

```sh
npx create-react-app cra-ts --typescript
```

## Step 2: Initialize Storybook w/ TS

```sh
cd cra-ts
npx -p @storybook/cli@next sb init --story-format=csf-ts
```

## Step 3: Install & Configure Docs

```sh
yarn add @storybook/addon-docs@next --dev
```

Then edit `./.storybook/presets.js`:

```js
const path = require("path");

module.exports = [
  {
    name: "@storybook/preset-create-react-app",
    options: {
      tsDocgenLoaderOptions: {
        tsconfigPath: path.resolve(__dirname, "../tsconfig.json")
      }
    }
  },
  {
    name: "@storybook/addon-docs/react/preset",
    options: {
      configureJSX: true,
      sourceLoaderOptions: null
    }
  }
];
```

## Step 4: Verify Installation

```sh
yarn storybook
```

Then edit button caption in `./src/stories/1-Button.stories.tsx` and verify that the story updates in Storybook.

Also verify that there's a `Docs` tab, and that it shows something reasonable-ish. We'll make it better in the next step.

## Step 5: Test Props

Storybook can't load docgen information from pre-built libraries, so to test that aspect out, create a file `./src/stories/Button.tsx`:

```tsx
import React, { FC } from "react";

interface ButtonProps {
  /**
   * Simple click handler
   */
  onClick?: () => void;
}

/**
 * The world's most _basic_ button
 */
export const Button: FC<ButtonProps> = ({ children, onClick }) => (
  <button onClick={onClick} type="button">
    {children}
  </button>
);
```

Then update `./src/stories/1-Button.stories.tsx` to import this button instead of the `@storybook/react` demo button. You should see the props update and also the component documentation show up on the `Docs` tab.

## Step 6: Test MDX

Finally, test that MDX is working.

You already installed docs in Step 3, but now you need to tell Storybook to load `.stories.mdx` files by editing `.storybook/config.ts`:

```js
import { configure } from "@storybook/react";

configure(
  require.context("../src/stories", true, /\.stories\.(mdx|[tj]sx?)$/),
  module
);
```

Then create `./src/stories/Test.stories.mdx`:

```
import { Meta, Story, Preview, Props } from "@storybook/addon-docs/blocks";
import { Button } from "./Button";

<Meta title="Test" />

Here's some _markdown_!

# Preview

<Preview>
  <Story name="button">
    <Button>hello</Button>
  </Story>
</Preview>

# Props

<Props of={Button} />
```

You should see a new entry in your Storybook's navigation, a story, and the documentation you wrote in the `Docs` tab.

## Notes

The `sourceLoaderOptions: null` in `Step 3` is covering up Storybook issue #7829: [Addon-docs: Typescript source support](https://github.com/storybookjs/storybook/issues/7829). I'll fix that issue ASAP to complete the walkthrough and update this gist when it's ready.
