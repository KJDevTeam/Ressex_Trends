var layoutModule = function () {


    return {
        init: function () {
            var _ProjectTitle = localStorage.getItem('ProjectTitle');

            if (_ProjectTitle != null) {
                $('#ProjectHeading').text(_ProjectTitle);
            }
            
            
        }


    }

}();