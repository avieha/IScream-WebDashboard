import faker from '@faker-js/faker';

export default {
    current_waiting_calls: 0,
    waiting_times: [],
    number_of_waiting_calls: [
  //      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    average_waiting_time_per_hour: [
   //     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    calls_per_topic: {
        // הצטרפות: 0,
        // ניתוק: 0,
        // תלונה: 0,
        // שירות: 0
    },
    calls_per_hour: [
        // {
        //     name: 'הצטרפות',
        //     data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // },
        // {
        //     name: 'ניתוק',
        //     data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // },
        // {
        //     name: 'שירות',
        //     data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // },
        // {
        //     name: 'תלונה',
        //     data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // }
    ],
    last_calls: [
        // {
        //     title: 'אייל לוי',
        //     time: faker.date.past(),
        //     phone: faker.phone.phoneNumber('05########'),
        //     type: 'ניתוק'
        // },
        // {
        //     title: 'שרון כהן',
        //     time: faker.date.past(),
        //     phone: faker.phone.phoneNumber('05########'),
        //     type: 'שירות'
        // },
        // {
        //     title: 'חננאל לזר',
        //     time: faker.date.past(),
        //     phone: faker.phone.phoneNumber('05########'),
        //     type: 'שירות'
        // },
        // {
        //     title: 'יוני אסקו',
        //     time: faker.date.past(),
        //     phone: faker.phone.phoneNumber('05########'),
        //     type: 'הצטרפות'
        // },
        // {
        //     title: 'דן דוידוב',
        //     time: faker.date.past(),
        //     phone: faker.phone.phoneNumber('05########'),
        //     type: 'תלונה'
        // }
    ],
    calls_per_city: {
        'פתח תקווה': 0,
        נתניה: 0,
        חיפה: 0,
        ירושלים: 0,
        'תל אביב': 0,
        נצרת: 0,
        אשקלון: 0,
        אריאל: 0
    },
    calls_per_age: {
        'גיל < 18': 0,
        '18-25': 0,
        '26-35': 0,
        '36-45': 0,
        '46-55': 0,
        '56-65': 0,
        '66+': 0
    }
};
