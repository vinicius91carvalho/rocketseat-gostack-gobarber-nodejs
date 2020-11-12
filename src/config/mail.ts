interface IMailConfig {
    driver: 'ethereal' | 'ses';
    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',
    defaults: {
        from: {
            email: 'test@compare-yourself.info',
            name: 'Test Bootcamp Rocketseat',
        },
    },
} as IMailConfig;
