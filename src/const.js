const globals = {};

globals.emptyPage = {
  menuLabel: '',
  backgroundColor: 'red',
  public: false,
  components: [],
}

globals.emptyComponent = {
  type: 'article',
  public: true,
  data: {}
}

globals.availableComponents = [
  'article',
  'index',
  'sponsors'
]

globals.availableColors = ['red', 'yellow', 'green', 'white', 'black']




export default globals;