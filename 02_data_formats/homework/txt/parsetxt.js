const fs = require('fs');

try {  
    let data = fs.readFileSync('me.txt', 'utf8');
    console.log(data.toString());    
} catch(e) {
    console.log('Error:', e.stack);
}