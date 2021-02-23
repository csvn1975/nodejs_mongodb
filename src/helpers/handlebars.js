const handlebars = require('handlebars');
module.exports = {
    sum: (a, b) => a + b,
    sortTable: (field, sort) =>{ 
        // nur curent-field
        const sortType = (field === sort.column) ? sort.type : 'default'

        const icons = {
            default: 'fa fa-sort',
            asc: 'fas fa-sort-amount-up-alt',
            desc:'fas fa-sort-amount-down-alt'
        }
        const icon = icons[sortType]; 

        const types = {
            default: 'desc',
            asc: 'desc',
            desc:'asc'
        }
        const  type = types[sortType];

        //safe gegen hacker
        const href = handlebars.escapeExpression(`?sort&column=${field}&type=${type}`);
        const output = `<a href="${href}"><i class="${icon} ml-2"></i></a>`;
        return new handlebars.SafeString(output);
        
    },

    setCurrentUser: function (res, data) {
        
        if (data._id){
            res.cookie("userId", data._id, {signed:true });
            res.cookie("user", data, {signed:true });  
        }
        
    },

    resetUser: function (res) {
        res.clearCookie('user');
        res.clearCookie('userId');
        res.locals.currentUser = {
            login: false,
            username: 'Username',
        }
    }

    
}
