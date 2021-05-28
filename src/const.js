const globals = {};

globals.emptyPage = {
  menuLabel: '',
  backgroundColor: 'red',
  public: false,
  components: [],
}

globals.emptyComponent = () => ({
  _id: Date.now(),
  type: 'article',
  public: true,
  data: {}
})

globals.availableComponents = [
  'article',
  'index',
  'sponsors',
  'image',
  'gallery',
  'image-gallery',
  'video-gallery',
  'livestream',
]

globals.availableColors = ['red', 'yellow', 'green', 'white', 'black']




export default globals;