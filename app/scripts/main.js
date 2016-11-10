
vm = new Vue({
  el: '#wiki-viewer',
  data: {
    query: '',
    articles: [],
    noResults: false
  },
  methods: {
    getArticles: function() {
      var options = { jsonp: 'callback' },
          url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + this.query;
      console.log(url)
      this.$http.jsonp(url, options).then(this.handleResponse, this.handleError);
    },
    handleResponse: function(response) {
      this.articles = response.body.query.search;
      this.noResults = false;
      if (this.articles.length === 0) {
        this.noResults = true;
      }   
    },
    handleError: function(error) {
      console.log('Something went wrong', error);
      this.noResults = true;
    },
    snake_case: function(str) {
      return str.split(' ').join('_');
    },
    url: function(title) {
      return 'https://en.wikipedia.org/wiki/'+ this.snake_case(title);
    },
    visit: function(title) {
      return 'Visit the ' + title + ' page on Wikipedia.';
    }
  }
});
