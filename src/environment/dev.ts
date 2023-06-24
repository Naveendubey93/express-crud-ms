import { IEnv } from "../interfaces/IEnv";
console.log("process.env",process.env.environment);
export const ENV:IEnv = {
	stage: process.env.ENVIRONMENT,
	port: process.env.port,
	domain:'',
	apiPath: '',
	staticPath: '',

	db: {
		name: process.env.DBName ||'nodeTs',
		user: process.env.DBUserName || 'nkdubey',
		pw: process.env.DBPw || 'Navin12345',
		account: process.env.DBAccount,
		uri: (user: string, pw :string, name :string, account: string) => {
			return `mongodb+srv://${user}:${pw}${account}.gklxn.mongodb.net/${name}?retryWrites=true&w=majority`
		}
	},
	adminCreds: {
		id: '',
		password: '',
		email: '' ,
		secret: '',
		token: () => ''
	},
    
}

// mongodb+srv://nkdubey:<password>@cluster0.gklxn.mongodb.net/
// const username = encodeURIComponent("nkdubey");
// const password = encodeURIComponent("Navin12345");
// const cluster = encodeURIComponent('cluster0.gklxn.mongodb.net');
// mongodb+srv://${username}:${password}@${cluster}/fullStack?retryWrites=true&w=majority`,
// mongodb+srv://nkdubey:Navin12345@$cluster0.gklxn.mongodb.net/fullStack?retryWrites=true&w=majority

//samples  	// mongodb+srv://${username}:${password}@${cluster}/fullStack?retryWrites=true&w=majority
	// mongodb+srv://nkdubey:<password>@cluster0.gklxn.mongodb.net/

// return 'mongodb+srv://uat-user:vB7m4gJAc1Qb9KZP@rbac-instance.lj2ns.mongodb.net/hmcluatdb?retryWrites=true&w=majority'