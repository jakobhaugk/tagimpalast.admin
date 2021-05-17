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
  'sponsors',
  'image',
]

globals.availableColors = ['red', 'yellow', 'green', 'white', 'black']




export default globals;