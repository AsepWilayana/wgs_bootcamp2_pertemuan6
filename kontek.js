const readline = require("readline");
const fs = require ("fs")


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//membuat folder data apabila tidak ada
function buatFolder() {
    const dirPath = './data';
    if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath);
    }
}

// membuat file contact.json jika belum ada
function buatFile() {
    const dataPath = './data/contacts.json';
    if(!fs.existsSync(dataPath)){
        fs.writeFileSync(dataPath,'[]', 'utf-8')
    }
}

const question = (ask) => {
    return new Promise((resolve, reject) => {
        rl.question(ask, inputvariable => {
            if (inputvariable) {
                resolve(inputvariable);
            } else {
                resolve(question_name());
            }
        });
    });
};

const data = async() => {
    buatFolder();
    buatFile();
   
    const name = await question("What's your name?");
    const email = await question("What's your email?");
    const phone= await question("your mobile number?");
    
    //data yg akan di masukan file contact
    const contact = {name, phone, email};
    //tempat penyimpanan
    const file = fs.readFileSync('data/contacts.json','utf8');
    const contacts = JSON.parse(file);
    //tambhakan ke file
    contacts.push(contact);

    fs. writeFileSync('data/contacts.json',JSON.stringify(contacts));
    console.log('terimakasih sudah memasukkan data');
    console.log(contacts);
    rl.close();
}

module.exports = {data};