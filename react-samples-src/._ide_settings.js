// workaround for import resolution with alias babel aliasfy
// https://youtrack.jetbrains.com/issue/WEB-22717#focus=streamItem-27-1558931-0-0
System.config({
  paths: {
    '~/*': './src/*',
  },
});
