import xlsx from 'node-xlsx';
import fs from 'fs'
import User from '../models/User.js';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../config/data.js';


const buildXLSX = async () => {
    const user = await User.find({})
    console.log(user);
    const data = [['User ID', 'Username', 'Полное имя', 'Дата регистрации']]

    for (let index = 0; index < user.length; index++) {
        data.push([
            user[index].user_id,
            user[index].username,
            user[index].first_name + ' ' + user[index].last_name,
            dayjs(+user[index].created_at).format(DATE_FORMAT)
        ]);
    }

    var buffer = await xlsx.build([{ name: 'mySheetName', data: data }]); // Returns a buffer

    const filePath = `./src/assets/xlsx/${Date.now()}.xlsx`;
    await fs.writeFileSync(filePath, buffer);

    return { source: filePath }
}

export default buildXLSX
