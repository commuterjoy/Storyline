
// GET http://localhost:3000/storylines

(function (w) {

    var modules = { 
        
        makeToolbar: function () {
            
            var toolbar = document.createElement('div');
            toolbar.innerHTML = 'Structured data tool';
            toolbar.className = 'storyline-toolbar';
            toolbar.id = 'storyline';
            document.body.appendChild(toolbar);

            var buttons = document.createElement('div');
            toolbar.appendChild(buttons);
            
            var b1 = document.createElement('input')
            b1.id = 'togglePersonButton'; 
            b1.setAttribute('type', 'button');
            b1.setAttribute('value', 'Person');
            b1.setAttribute('unselectable', 'on');
            
            var b2 = document.createElement('input')
            b2.id = 'toggleLocationButton'; 
            b2.setAttribute('type', 'button');
            b2.setAttribute('value', 'Location');
            b2.setAttribute('unselectable', 'on');
            
            var b3 = document.createElement('input')
            b3.id = 'toggleEventButton'; 
            b3.setAttribute('type', 'button');
            b3.setAttribute('value', 'Event');
            b3.setAttribute('unselectable', 'on');
            
            buttons.appendChild(b1);
            buttons.appendChild(b2);
            buttons.appendChild(b3);
        },

        range: function () {
    
            var personApplier, locationApplier, eventApplier;

            function togglePerson() {
                personApplier.toggleSelection();
            }
            
            function toggleLocation() {
                locationApplier.toggleSelection();
                listEntities();
            }
            
            function toggleEvent() {
                eventApplier.toggleSelection();
                listEntities();
            }

            rangy.init();
            var cssClassApplierModule = rangy.modules.CssClassApplier;
            
            personApplier = rangy.createCssClassApplier("person");
            locationApplier = rangy.createCssClassApplier("location");
            eventApplier = rangy.createCssClassApplier("event");
        
            var togglePersonButton = document.getElementById('togglePersonButton');
                togglePersonButton.disabled = false;
                togglePersonButton.ontouchstart = togglePersonButton.onmousedown = function() {
                    togglePerson();
                    return false;
                };
        
            var toggleLocationButton = document.getElementById('toggleLocationButton');
                toggleLocationButton.disabled = false;
                toggleLocationButton.ontouchstart = toggleLocationButton.onmousedown = function() {
                    toggleLocation();
                    return false;
                };
     
            var toggleEventButton = document.getElementById('toggleEventButton');
                toggleEventButton.disabled = false;
                toggleEventButton.ontouchstart = toggleEventButton.onmousedown = function() {
                    toggleEvent();
                    return false;
                };
        }

    }

    var go = function () {
        console.log('hello!');
        modules.makeToolbar();
        modules.range();
    }

    go()

})(window)
