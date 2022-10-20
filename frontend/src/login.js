(login => {
        login._changeView = viewId => {
        let sections = document.querySelectorAll('body > section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        document.getElementById(viewId).classList.add('active');
    };
})(login || (login = {}))