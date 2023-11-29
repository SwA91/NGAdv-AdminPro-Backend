const { TypeRole } = require('../enum/shared.enum');

const getMenuFrontend = (role = TypeRole.USER_ROLE) => {

    // validate role
    if (!Object.values(TypeRole).includes(role)) {
        throw new Error(`Role not valid: ${role}`);
    }

    const menu = [
        // 0: DASHBOARD
        {
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'Gráficas', url: 'grafica1' },
                { titulo: 'rxjs', url: 'rxjs' },
                { titulo: 'Promesas', url: 'promesas' },
                { titulo: 'ProgressBar', url: 'progress' },
            ]
        },
        // 1: MAINTENANCE
        {
            titulo: 'Maintenance',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                // { titulo: 'Users', url: 'users' },
                { titulo: 'Hospitals', url: 'hospitals' },
                { titulo: 'Doctors', url: 'doctors' },
            ]
        },
    ];

    if (role === TypeRole.ADMIN_ROLE) {
        menu[1].submenu.unshift({ titulo: 'Users', url: 'users' })
    }
    return menu;
}

module.exports = {
    getMenuFrontend,
}