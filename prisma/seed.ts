import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    const user1 = await prisma.user.upsert({
        where: {username: 'Turkikaze'},
        update:{},
        create:{
            username:'Turkikaze',
            email:'aslancemil09@gmail.com',
            password:'Cemilaslan2002'
        }
    })


    const user2 = await prisma.user.upsert({
        where: {username: 'Cernil'},
        update:{},
        create:{
            username:'Cernil',
            email:'cemil09@gmail.com',
            password:'Cemilaslan2002'
        }
    })
    

    console.log(user1,user2)
}

main()
    .catch((e)=>{
        console.error(e);
        process.exit(1)
    })
    .finally(async()=>{
        await prisma.$disconnect();
    })