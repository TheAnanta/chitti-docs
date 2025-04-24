// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    "intro",
    {
      type: "category",
      label: "Client App",
      items: [
        { type: "doc", label: "Overview", id: "client-app/overview" },
        { type: "doc", label: "Architecture", id: "client-app/architecture" },
        { type: "doc", label: "Models", id: "client-app/models" },
        { type: "doc", label: "Use cases", id: "client-app/usecases" },
        { type: "doc", label: "User flow", id: "client-app/userflow" },
      ],
    },
    {
      type: "category",
      label: "Admin App",
      items: [
        { type: "doc", label: "Overview", id: "admin-app/overview" },
        // { type: "doc", label: "Architecture", id: "admin-app/architecture" },
        // { type: "doc", label: "User flow", id: "admin-app/userflow" },
      ],
    },
    {
      type: "doc",
      label: "Serverlet",
      id: "serverlet",
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
