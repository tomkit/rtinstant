define([ 'views/baseview' ], function(BaseView) {
    var BodyView = BaseView.extend({

        el : $('#body-container'),

        events : {
            'keyup #body-input' : 'onInputKeypress',
            'keypress #body-input' : 'eatEnter',
            'mouseover [rel]' : 'onPopoverin',
            'mouseout [rel]' : 'onPopoverout',
            'click .tile-area' : 'onClick'
        },

        initialize : function() {
            console.log('body view initialized');
            this.$el.find('[rel]').popover({
                content : ''
            });
        },
        
        onClick : function(event) {
            event.preventDefault();
        },
        
        onPopoverin : function(event) {
            this._show = setTimeout(function() {
                $(event.currentTarget).popover('show');
            }, 200); 
            
        },
        
        onPopoverout : function(event) {
            clearTimeout(this._show);
            $(event.currentTarget).popover('hide');
        },
        
        _reset : function() {
            this.$el.find('#movie-poster').css('background', '#FFD700');
            this.$el.find('.movie-tile .tile-content').html('');
        },
        
        eatEnter : function(event) {
            if(event.keyCode === 13) {
                return false;
            }
        },

        onInputKeypress : function(event) {
            var queryString = $(event.currentTarget).val();
            var that = this;
            
            
            
            $.ajax({
                url : 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=eqqeh7p28fxpbzvhwt7f42es&q=' + queryString + '&page_limit=1',
                dataType : 'jsonp',
                success : function(returnVal) {

                    if (!returnVal.movies) {
                        that._reset();
                    } else {
                        var movie = returnVal.movies[0];

                        if(movie) {
                            that._reset();
                            that.$el.find('#movie-poster').css('background', 'url(' + movie.posters.detailed+ ')').css('padding-top', '5px').css(
                                'padding-bottom', '5px').css('padding-left', '5px').css('padding-right', '5px').attr('width', '370').attr('height',
                                '480');
                            that.$el.find('#1 .tile-content').html(movie.title);
                            that.$el.find('#2 .tile-content').html(movie.ratings.critics_score);
                            that.$el.find('#3 .tile-content').html(movie.critics_consensus);
                            that.$el.find('#4 .tile-content').html(movie.mpaa_rating);
                            that.$el.find('#5 .tile-content').html(movie.runtime);
                            that.$el.find('#6 .tile-content').html(movie.ratings.critics_rating);
                            
                            
                        } else {
                            that._reset();
                        }
                        
                    }

                }
            });
            event.preventDefault();
        }

    });

    return BodyView;
});