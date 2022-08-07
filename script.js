let timer_array = [];
const game = {start:null,end:null};
const questions = [
	{
		"question": "Which sports the tropy Ashes Series belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Asia Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Benson and Hedges belongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy C. K. Naidu Trophy belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Coach Behar Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Deodhar Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Duleep Trophy belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy G. D. Birla Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy  Ghulam Ahmed Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy  ICC Champions Trophy belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy  ICC World Cup belongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy  Irani Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Moinuddowla Gold Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy MRF World Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Nehru Cup (Jawaharlal Nehru Cup) belongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Rani Jhansi Trophy belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy  Ranji Trophy  belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Reliance Cup  belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Rohinton Baria Trophy belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy  Rothman’s Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Sahara Cup  belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy  Sheesh Mahal Trophy belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Vijay Merchant Trophybelongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Vizzy Trophy  belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Wills Trophy belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Chakra Gold Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Bandodkar Trophy belongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Colombo Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy D. C. M. Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Dr. B. C. Roy Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Dr. B.C. Roy Trophy: Football (Junior) belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Durand Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Durand Cup, F. A. Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy European Champions Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy F. A. Shield belongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy FA Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Federation Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy FIFA World Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy G.V. Raja Memorial Trophy belongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy IFA Shield belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Jules Rimet Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Kalinga Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Merdeka Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Najee Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Nixon Gold Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Raghbir Singh Memorial Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Rovers Cup belongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Sanjay Gold Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Santosh Trophy (National Football) belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Scissor Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Sir Ashutosh Mukherjee Trophy belongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Subrata Mukherjee Cup (National school football) belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Subroto Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionC"
	},
	{
		"question": "Which sports the tropy Todd Memorial Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Vittal Trophy belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Amrit Diwan Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Chadha Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Divan Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Ibrahim Rahimatillah Challenger Cup belongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Lady Ratan Tata Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Maharaja Ranjit Singh Gold Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Narang Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Thomas Cup belongs to ?",
		"optionA": "Badminton",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Tunku Abdul-Rahman Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Badminton",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Uber Cup (Women) belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Badminton",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Davis Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Lawn Tenis",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Grand Prix belongs to ?",
		"optionA": "Footbal",
		"optionB": "Lawn Tenis",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Jaylaxmi Cup (Women's) belongs to ?",
		"optionA": "Hockey",
		"optionB": "Lawn Tenis",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Rajendra Prasad Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Lawn Tenis",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Rajkumar Cup (Junior boys) belongs to ?",
		"optionA": "Footbal",
		"optionB": "Lawn Tenis",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Rajkumari Cup (Junior girls) belongs to ?",
		"optionA": "Lawn Tenis",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Ramanujan Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Lawn Tenis",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Thant Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Lawn Tenis",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Travancore Cup (Women's) belongs to ?",
		"optionA": "Hockey",
		"optionB": "Lawn Tenis",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Wightman Cup belongs to ?",
		"optionA": "Lawn Tenis",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Wimbledon Trophy belongs to ?",
		"optionA": "Footbal",
		"optionB": "Lawn Tenis",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Corbillion Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Table Tenis",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Corbitton Cup (Women) belongs to ?",
		"optionA": "Hockey",
		"optionB": "Table Tenis",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Jaylaxmi Cup (Women's) belongs to ?",
		"optionA": "Footbal",
		"optionB": "Table Tenis",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Rajkumar Cup (Junior boys) belongs to ?",
		"optionA": "Hockey",
		"optionB": "Table Tenis",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Rajkumari Challenge Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Table Tenis",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Ramanujan Trophy belongs to ?",
		"optionA": "Footbal",
		"optionB": "Table Tenis",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Swaythling Cup (Men) belongs to ?",
		"optionA": "Table Tenis",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Table Tennis Grand Prix belongs to ?",
		"optionA": "Hockey",
		"optionB": "Table Tenis",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Travancore Cup (Women's) belongs to ?",
		"optionA": "Footbal",
		"optionB": "Table Tenis",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Maharaj Prithi Singh Baria Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Polo",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Prithi Singh Cup belongs to ?",
		"optionA": "Polo",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Radha Mohan Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Polo",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Westchester Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Polo",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Colombo Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Golf",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Eisenhower Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Golf",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Prince of Wales Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Golf",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Ryder Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Golf",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Walker Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Golf",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Bangalore Cup belongs to ?",
		"optionA": "Basket Ball",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Todd Memorial Trophy belongs to ?",
		"optionA": "Hockey",
		"optionB": "Basket Ball",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Williams Cup belongs to ?",
		"optionA": "Footbal",
		"optionB": "Basket Ball",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Burdwan Cup belongs to ?",
		"optionA": "Hockey",
		"optionB": "Weight Lifting",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Best Service in Sportsman belongs to ?",
		"optionA": "Air Racing",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Hockey",
		"correctOption": "optionA"
	},
	{
		"question": "Which sports the tropy Jaswant Singh belongs to ?",
		"optionA": "Footbal",
		"optionB": "Air Racing",
		"optionC": "Cricket",
		"optionD": "Hockey",
		"correctOption": "optionB"
	},
	{
		"question": "Which sports the tropy Jawaharlal Challenge belongs to ?",
		"optionA": "Hockey",
		"optionB": "Cricket",
		"optionC": "Footbal",
		"optionD": "Air Racing",
		"correctOption": "optionD"
	},
	{
		"question": "Which sports the tropy Nehru Trophy Boat Race belongs to ?",
		"optionA": "Hockey",
		"optionB": "Boat Racing(Kerala)",
		"optionC": "Cricket",
		"optionD": "Footbal",
		"correctOption": "optionB"
	},
	{
		"question": "What is the captial of State  Andhra Pradesh ?",
		"optionA": "Itanagar",
		"optionB": "Patna",
		"optionC": "Amaravati",
		"optionD": "Dispur",
		"correctOption": "optionC"
	},
	{
		"question": "What is the captial of State Arunachal Pradesh ?",
		"optionA": "Dispur",
		"optionB": "Patna",
		"optionC": "Amaravati",
		"optionD": "Arunachal Pradesh",
		"correctOption": "optionD"
	},
	{
		"question": "What is the captial of State Assam ?",
		"optionA": "Assam",
		"optionB": "Amaravati",
		"optionC": "Itanagar",
		"optionD": "Patna",
		"correctOption": "optionA"
	},
	{
		"question": "What is the captial of State Bihar ?",
		"optionA": "Itanagar",
		"optionB": "Patna",
		"optionC": "Amaravati",
		"optionD": "Dispur",
		"correctOption": "optionB"
	},
	{
		"question": "What is the captial of State Chhattisgarh ?",
		"optionA": "Patna",
		"optionB": "Raipur",
		"optionC": "Itanagar",
		"optionD": "Dispur",
		"correctOption": "optionB"
	},
	{
		"question": "What is the captial of State Goa  ?",
		"optionA": "Goa",
		"optionB": "Patna",
		"optionC": "Amaravati",
		"optionD": "Itanagar",
		"correctOption": "optionA"
	},
	{
		"question": "What is the captial of State Gujarat  ?",
		"optionA": "Gandhinagar",
		"optionB": "Patna",
		"optionC": "Amaravati",
		"optionD": "Dispur",
		"correctOption": "optionA"
	},
	{
		"question": "What is the captial of State  Haryana ?",
		"optionA": "Chandigarh",
		"optionB": "Patna",
		"optionC": "Amaravati",
		"optionD": "Itanagar",
		"correctOption": "optionA"
	},
	{
		"question": "What is the captial of State  Himachal Pradesh ?",
		"optionA": "Patna",
		"optionB": "Shimla",
		"optionC": "Itanagar",
		"optionD": "Dispur",
		"correctOption": "optionB"
	},
	{
		"question": "What is the captial of State Jharkhand  ?",
		"optionA": "Ranchi",
		"optionB": "Patna",
		"optionC": "Amaravati",
		"optionD": "Dispur",
		"correctOption": "optionA"
	},
	{
		"question": "What is the captial of State  Karnataka ?",
		"optionA": "Bengaluru",
		"optionB": "Amaravati",
		"optionC": "Itanagar",
		"optionD": "Patna",
		"correctOption": "optionA"
	},
	{
		"question": "What is the captial of State Kerala  ?",
		"optionA": "Dispur",
		"optionB": "Thiruvananthapuram",
		"optionC": "Amaravati",
		"optionD": "Itanagar",
		"correctOption": "optionB"
	},
	{
		"question": "What is the captial of State Madhya Pradesh  ?",
		"optionA": "Bhopal",
		"optionB": "Patna",
		"optionC": "Amaravati",
		"optionD": "Dispur",
		"correctOption": "optionA"
	},
	{
		"question": "What is the captial of State  Maharashtra ?",
		"optionA": "Dispur",
		"optionB": "Mumbai",
		"optionC": "Amaravati",
		"optionD": "Itanagar",
		"correctOption": "optionB"
	},
	{
		"question": "What is the captial of State Manipur  ?",
		"optionA": "Imphal",
		"optionB": "Amaravati",
		"optionC": "Itanagar",
		"optionD": "Patna",
		"correctOption": "optionA"
	},
	{
		"question": "What is the captial of State  Meghalaya ?",
		"optionA": "Shillong",
		"optionB": "Patna",
		"optionC": "Amaravati",
		"optionD": "Dispur",
		"correctOption": "optionA"
	},
	{
		"question": "What is the captial of State  Mizoram ?",
		"optionA": "Patna",
		"optionB": "Aizawl",
		"optionC": "Itanagar",
		"optionD": "Dispur",
		"correctOption": "optionB"
	},
	{
		"question": "What is the captial of State  Nagaland ?",
		"optionA": "Kohima",
		"optionB": "Patna",
		"optionC": "Amaravati",
		"optionD": "Itanagar",
		"correctOption": "optionA"
	},
	{
		"question": "What is the captial of State Odisha  ?",
		"optionA": "Bhubaneswar",
		"optionB": "Patna",
		"optionC": "Amaravati",
		"optionD": "Dispur",
		"correctOption": "optionA"
	},
	{
		"question": "What is the captial of State  Punjab ?",
		"optionA": "Dispur",
		"optionB": "Chandigarh",
		"optionC": "Amaravati",
		"optionD": "Itanagar",
		"correctOption": "optionB"
	},
	{
		"question": "What is the captial of State   Rajasthan?",
		"optionA": "Patna",
		"optionB": "Amaravati",
		"optionC": "Jaipur",
		"optionD": "Dispur",
		"correctOption": "optionC"
	},
	{
		"question": "What is the captial of State Sikkim  ?",
		"optionA": "Itanagar",
		"optionB": "Gangtok",
		"optionC": "Amaravati",
		"optionD": "Dispur",
		"correctOption": "optionB"
	},
	{
		"question": "What is the captial of State  Tamil Nadu ?",
		"optionA": "Dispur",
		"optionB": "Amaravati",
		"optionC": "Chennai",
		"optionD": "Patna",
		"correctOption": "optionC"
	},
	{
		"question": "What is the captial of State  Telangana ?",
		"optionA": "Dispur",
		"optionB": "Patna",
		"optionC": "Amaravati",
		"optionD": "Hyderabad",
		"correctOption": "optionD"
	},
	{
		"question": "What is the captial of State Tripura  ?",
		"optionA": "Itanagar",
		"optionB": "Agartala",
		"optionC": "Amaravati",
		"optionD": "Dispur",
		"correctOption": "optionB"
	},
	{
		"question": "What is the captial of State  Uttar Pradesh ?",
		"optionA": "Lucknow",
		"optionB": "Patna",
		"optionC": "Amaravati",
		"optionD": "Itanagar",
		"correctOption": "optionA"
	},
	{
		"question": "What is the captial of State  West Bengal ?",
		"optionA": "Dispur",
		"optionB": "Amaravati",
		"optionC": "Itanagar",
		"optionD": "Kolkata",
		"correctOption": "optionD"
	},
	{
		"question": "How many days makes a week ?",
		"optionA": "10 days",
		"optionB": "5 days",
		"optionC": "7 days",
		"optionD": "14 days",
		"correctOption": "optionC"
	},
	{
		"question": "How many players are allowed on a soccer pitch ?",
		"optionA": "9 players",
		"optionB": "12 players",
		"optionC": "10 players",
		"optionD": "11 players",
		"correctOption": "optionD"
	},
	{
		"question": "Who was the first President of USA ?",
		"optionA": "Barack Obama",
		"optionB": "Abraham Lincoln",
		"optionC": "George Washington",
		"optionD": "Donald Trump",
		"correctOption": "optionC"
	},
	{
		"question": "30 days has ______ ?",
		"optionA": "January",
		"optionB": "June",
		"optionC": "August",
		"optionD": "December",
		"correctOption": "optionB"
	},
	{
		"question": "How manay hours can be found in a day ?",
		"optionA": "38 hours",
		"optionB": "48 hours",
		"optionC": "24 hours",
		"optionD": "30 hours",
		"correctOption": "optionC"
	},
	{
		"question": "Which is the longest river in the world ?",
		"optionA": "River Niger",
		"optionB": "Lake Chad",
		"optionC": "River Nile",
		"optionD": "Long River",
		"correctOption": "optionA"
	},
	{
		"question": "_____ is the hottest Continent on Earth ?",
		"optionA": "Oceania",
		"optionB": "Africa",
		"optionC": "North America",
		"optionD": "Antarctica",
		"correctOption": "optionB"
	},
	{
		"question": "Which country is the largest in the world ?",
		"optionA": "Canada",
		"optionB": "Egypt",
		"optionC": "Russia",
		"optionD": "Africa",
		"correctOption": "optionD"
	},
	{
		"question": "Which of these numbers is an odd number ?",
		"optionA": "Twelve",
		"optionB": "Eight",
		"optionC": "Eleven",
		"optionD": "Ten",
		"correctOption": "optionC"
	},
	{
		"question": "`\"You Can't see me is a popular saying by`",
		"optionA": "Eminem",
		"optionB": "Chris Brown",
		"optionC": "John Cena",
		"optionD": "Bill Gates",
		"correctOption": "optionC"
	},
	{
		"question": "Where is the world tallest building located ?",
		"optionA": "California",
		"optionB": "Dubai",
		"optionC": "Italy",
		"optionD": "Africa",
		"correctOption": "optionB"
	},
	{
		"question": "The longest river in the United Kingdom is ?",
		"optionA": "River Mersey",
		"optionB": "River Tweed",
		"optionC": "River Severn",
		"optionD": "River Trent",
		"correctOption": "optionD"
	},
	{
		"question": "How many permanent teeth does a dog have ?",
		"optionA": "38",
		"optionB": "40",
		"optionC": "36",
		"optionD": "42",
		"correctOption": "optionD"
	},
	{
		"question": "Which national team won the football World cup in 2018 ?",
		"optionA": "Germany",
		"optionB": "France",
		"optionC": "England",
		"optionD": "Brazil",
		"correctOption": "optionB"
	},
	{
		"question": "Which US state was Donald Trump Born ?",
		"optionA": "California",
		"optionB": "New Jersey",
		"optionC": "Los Angeles",
		"optionD": "New York",
		"correctOption": "optionB"
	},
	{
		"question": "How man states does Nigeria have ?",
		"optionA": "24",
		"optionB": "36",
		"optionC": "37",
		"optionD": "30",
		"correctOption": "optionB"
	},
	{
		"question": "____ is the capital of Nigeria ?",
		"optionA": "Lagos",
		"optionB": "Calabar",
		"optionC": "Kano",
		"optionD": "Abuja",
		"correctOption": "optionB"
	},
	{
		"question": "Los Angeles is also known as ?",
		"optionA": "City of Angels",
		"optionB": "Lost Angels",
		"optionC": "Angels City",
		"optionD": "Shining city",
		"correctOption": "optionA"
	},
	{
		"question": "What is the capital of Germany ?",
		"optionA": "Georgia",
		"optionB": "Oklahoma",
		"optionC": "Berlin",
		"optionD": "Missouri",
		"correctOption": "optionC"
	},
	{
		"question": "How many sides does an hexagon have ?",
		"optionA": "Sevene",
		"optionB": "Five",
		"optionC": "Six",
		"optionD": "Four",
		"correctOption": "optionD"
	},
	{
		"question": "How many planets are currently in the solar system ?",
		"optionA": "Seven",
		"optionB": "Nine",
		"optionC": "Eight",
		"optionD": "Eleven",
		"correctOption": "optionC"
	},
	{
		"question": "Which Planet is the hottest ?",
		"optionA": "Jupitar",
		"optionB": "Earth",
		"optionC": "Venus",
		"optionD": "Mercury",
		"correctOption": "optionD"
	},
	{
		"question": "where is the smallest bone in human body located?",
		"optionA": "Ears",
		"optionB": "Fingers",
		"optionC": "Nose",
		"optionD": "Toes",
		"correctOption": "optionA"
	},
	{
		"question": "How many hearts does an Octopus have ?",
		"optionA": "Two",
		"optionB": "Four",
		"optionC": "One",
		"optionD": "Three",
		"correctOption": "optionD"
	},
	{
		"question": "How many teeth does an adult human have ?",
		"optionA": "28",
		"optionB": "32",
		"optionC": "36",
		"optionD": "30",
		"correctOption": "optionB"
	}
]
let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    endTimer();
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 9) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber);
        }
        else {
            handleEndGame();
			//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
    var T = document.getElementById("TestsDiv");
    T.style.display = "none"; 
    var S = document.getElementById("TestsDivs");
    S.style.display = "none"; 
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null
    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / questions.length) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"
    var wrapper = document.getElementById('timer');
    var myHTML = '';
    for(var i = 0; i < 10; i++){
        myHTML += '<tr><td>' + (i+1) + '</td><td>' + timer_array[i] + '</td></tr><br>';
    }
    wrapper.innerHTML = myHTML;

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

function getOptions() {
    var T = document.getElementById("TestsDiv");
    T.style.display = "flex"; 
    startTimer();
}


function startTimer(){
    const date = new Date(); 
    game.start = date.getTime();
 }

function endTimer(){
    const date = new Date();
    game.end = date.getTime();
    const totalTime = ((game.end-game.start)/1000);
    timer_array.push(totalTime);
    clearInterval(game.timer);
 }
