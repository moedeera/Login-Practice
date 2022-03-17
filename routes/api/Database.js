var Profiles = [
  {
    id: 1,
    status: "public",
    name: "Jennifer Smith",
    nickname: "Jenny",
    location: "Toronto, ON",
    description: "Night Owl Queen",
    age: 25,
    scores: [125, 102, 55],
    header: "Mom to 2 cats and a Dog",
    about:
      "Photography aficionado, GamerGirl, Outdoorsy-gal, solo-traveler. Vlogger...pretty much your average millennial",
    Feed: [
      { name: "Connie Williams", type: "like", id: 2 },
      { name: "Matt Russo", type: "request", id: 3 },
      { name: "James Santos", type: "request", id: 4 },
    ],
    profilePic:
      "https://images.pexels.com/photos/1090387/pexels-photo-1090387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    followerCount: 26,
    login: false,
    Notifications: 2,
    Notices: [
      {
        id: 50,
        type: "message",
        user: 2,
        from: "Connie",
        date: new Date("2022-03-01"),
        picture:
          "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        text: "Hey do you wanna go skiing tomorrow?",
        pending: true,
      },
      {
        id: 20,
        type: "message",
        user: 6,
        from: "Mitch Wiz",
        date: new Date("2022-02-25"),
        text: "Thanks for the gift yo sent!",
        picture:
          "https://cdn.pixabay.com/photo/2019/11/10/11/13/couple-4615557_960_720.jpg",

        pending: true,
      },
    ],

    Friends: [2, 3, 4, 6, 11],
    followers: [5, 6, 9],
    following: [5, 7, 9],
    Posts: [6, 5, 1],
  },
  {
    id: 2,
    status: "public",
    name: "Connie Williams",
    nickname: "Connie",
    location: "Saskatoon, SK",
    description: "Master Procrastinator",
    age: 21,
    scores: [85, 42, 35],
    header: "Future Nurse in the making",
    about: "Currently enrolled in UofS Nursing, OilersFan and a shopaholic ",

    Feed: [
      { name: "Jen Smith", type: "like", id: 1 },
      { name: "James Johnson", type: "request", id: 5 },
      { name: "Jen Smith", type: "Challenge", id: 1 },
    ],
    profilePic:
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    followerCount: 23,
    login: false,
    Notifications: 0,
    Notices: [],
    Friends: [1, 3, 5],
    followers: [1, 2],
    following: [5],
    Posts: [5],
  },
  {
    id: 3,

    status: "private",
    name: "Matthew Russo",
    nickname: "Matt",
    location: "Edmonton, AB",
    description: "Slightly pretentious",
    age: 32,
    scores: [15, 19, 25],
    header: "Misunderstood Genius",
    about:
      "My name is Matt and I don't understand why this description box is here, this is not a dating site...is it? ",

    Feed: [
      { name: "Connie Williams", type: "like", id: 2 },
      { name: "James Johnson", type: "request", id: 5 },
      { name: "Jen Smith", type: "Challenge", id: 1 },
    ],
    profilePic:
      "https://images.pexels.com/photos/1819483/pexels-photo-1819483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    followerCount: 14,
    login: false,
    Notifications: 1,
    Notices: [
      {
        id: 10,
        type: "message",
        user: 4,
        from: "James",
        date: new Date("2022-03-01"),
        text: "Hey are you in town tomorrow?",
      },
    ],
    Friends: [1, 2, 5],
    followers: [2],
    following: [1],
    Posts: [6],
  },
  {
    id: 4,
    status: "public",
    name: "James Santos",
    nickname: "James",
    location: "Saskatoon, SK",
    description: "Accountant at BMC",
    age: 25,
    scores: [45, 22, 15],
    header: "I am all about the numbers ",
    about:
      "Graduated from UofS finally and now I can start to live in the real world",

    Feed: [
      { name: "Jen Smith", type: "like", id: 1 },
      { name: "Connie Williams", type: "request", id: 2 },
      { name: "James Johnson", type: "request", id: 5 },
      { name: "Jen Smith", type: "Challenge", id: 1 },
    ],
    profilePic:
      "https://images.pexels.com/photos/1693085/pexels-photo-1693085.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    followerCount: 56,
    login: false,
    Notifications: 0,
    Notices: [],
    Friends: [1, 4],
    followers: [2, 3],
    following: [1],
    Posts: [1],
  },
  {
    id: 5,
    status: "public",
    name: "James Johnson",
    nickname: "Jimmy",
    location: "Regina, SK",
    description: "Foreman at SG-Buildings",
    age: 35,
    scores: [15, 12, 25],
    header: "Dad to two lovely gals",
    about:
      "If you can't appreciate a cold one after a long day of work .........",

    Feed: [
      { name: "Jen Smith", type: "like", id: 1 },
      { name: "Connie Williams", type: "request", id: 2 },
      { name: "James Santos", type: "request", id: 4 },
      { name: "Jen Smith", type: "Challenge", id: 1 },
    ],
    profilePic:
      "https://images.pexels.com/photos/1693085/pexels-photo-1693085.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    followerCount: 56,
    login: false,
    Notifications: 0,
    Notices: [],
    Friends: [1, 2, 3],
    followers: [2, 1],
    following: [1],
    Posts: [1, 6],
  },
  {
    id: 6,
    status: "public",
    name: "Mitchell Wisnewski",
    nickname: "Mitch Wiz",
    location: "Lloydminister, SK",
    description: "Engineer at Fortrec",
    age: 29,
    scores: [51, 19, 95],
    header: "Just Got Married...",
    about: "Sorry ladies, I am off the market",

    Feed: [
      { name: "Connie Williams", type: "like", id: 2 },
      { name: "James Santos", type: "like", id: 4 },
    ],
    profilePic:
      "https://cdn.pixabay.com/photo/2019/11/10/11/13/couple-4615557_960_720.jpg",
    followerCount: 6,
    login: false,
    Notifications: 0,
    Notices: [],
    Friends: [1, 2, 3, 4],
    followers: [1, 3],
    following: [7],
    Posts: [1, 6],
  },
  {
    id: 7,
    status: "public",
    name: "Jose Silva",
    nickname: "Dr Silva",
    location: "Regina, SK",
    description: "Emergency Physician",
    age: 39,
    scores: [51, 19, 95],
    header: "Head of Sask Hospital ER",
    about: "Organizer of StoptheSpread.ca",

    Feed: [
      { name: "Connie Williams", type: "like", id: 2 },
      { name: "James Santos", type: "like", id: 4 },
    ],
    profilePic:
      "https://cdn.pixabay.com/photo/2021/02/09/06/45/doctor-5997504_960_720.jpg",
    followerCount: 6,
    login: false,
    Notifications: 0,
    Notices: [],
    Friends: [1, 2, 3, 4],
    followers: [1, 3],
    following: [1],
    Posts: [1, 6],
  },
  {
    id: 8,
    status: "public",
    name: "Kendra Watkins",
    nickname: "RN Kendra",
    location: "Calgary, Alberta",
    description: "Emergency Physician",
    age: 49,
    scores: [11, 19, 15],
    header: "Royal Hospital ER Nurse",
    about: "Proud mom of 2",

    Feed: [
      { name: "Connie Williams", type: "request", id: 2 },
      { name: "James Santos", type: "request", id: 4 },
    ],
    profilePic:
      "https://cdn.pixabay.com/photo/2020/11/07/20/29/injection-5722329_960_720.jpg",
    followerCount: 4,
    login: false,
    Notifications: 0,
    Notices: [],
    Friends: [7],
    followers: [2, 5, 6, 7],
    following: [7],
    Posts: [],
  },
  {
    id: 9,
    status: "public",
    name: "Samantha Smith",
    nickname: "RN Kendra",
    location: "Calgary, Alberta",
    description: "Emergency Physician",
    age: 19,
    scores: [1, 9, 5],
    header: "ALberta gal",
    about: "Art fanatic https://www.deviantart.com/sandara",

    Feed: [
      { name: "Connie Williams", type: "request", id: 2 },
      { name: "James Santos", type: "request", id: 4 },
    ],
    profilePic:
      "https://cdn.pixabay.com/photo/2017/06/10/22/58/composing-2391033_960_720.jpg",
    followerCount: 4,
    login: false,
    Notifications: 0,
    Notices: [],
    Friends: [7],
    followers: [1, 2, 3, 4],
    following: [1],
    Posts: [],
  },
  {
    id: 10,
    status: "public",
    name: "Jason Wiegel",
    nickname: "Jay",
    location: "Edmonton, Alberta",
    description: "Law Enforcement",
    age: 32,
    scores: [1, 3, 1],
    header: "Long neck ice cold beer never broke my heart... ",
    about: "If you are a flames fan, get the hell out of my profile page, NOW!",

    Feed: [{ name: "Barbara Wiegel", type: "request", id: 12 }],
    profilePic:
      "https://s1.ticketm.net/dam/a/fc6/7f086b40-3c4e-4fdc-b98d-a4e599c13fc6_1277301_TABLET_LANDSCAPE_LARGE_16_9.jpg",
    followerCount: 1,
    login: false,
    Notifications: 1,
    Notices: [],
    Friends: [9, 11],
    followers: [10],
    following: [10],
    Posts: [],
  },
  {
    id: 11,
    status: "private",
    name: "Nicholas Janovic",
    nickname: "Nick",
    location: "Calgary, Alberta",
    description: "Night Owl",
    age: 22,
    scores: [2, 13, 11],
    header: "[insert clever tagline]..... ",
    about: "Marvel fanboy in action, DC fanboys be aware",

    Feed: [
      {
        name: "Barbara Wiegel",
        type: "request",
        id: 12,
        name: "Kenneth Bolland",
        type: "request",
        id: 13,
      },
    ],
    profilePic:
      "https://cdn.pixabay.com/photo/2016/03/26/22/13/man-1281562_1280.jpg",

    followerCount: 3,
    login: false,
    Notifications: 1,
    Notices: [],
    Friends: [10, 11],
    followers: [2],
    following: [2],
    Posts: [],
  },
  {
    id: 12,
    status: "unlisted",
    name: "Barbara Weigel",
    nickname: "Barbara",
    location: "Morinville, Alberta",
    description: "Farming grandma",
    age: 62,
    scores: [4, 4, 12],
    header: "Oldtimer in love with the old days ",
    about:
      "Organizer of the Eastville summer festival,  contact me if you want to collaborate",

    Feed: [
      {
        name: "Jason Wiegel",
        type: "like",
        id: 10,
        name: "Kenneth Bolland",
        type: "request",
        id: 13,
      },
    ],
    profilePic:
      "https://cdn.pixabay.com/photo/2020/08/17/12/28/woman-5495263_1280.jpg",
    followerCount: 3,
    login: false,
    Notifications: 1,
    Notices: [],
    Friends: [10],
    followers: [2],
    following: [2],
    Posts: [],
  },
];

var Posts = [
  {
    id: 1,
    status: "public",
    Poster: 4,
    PosterName: "Jamie",
    PosterPic:
      "https://images.pexels.com/photos/1693085/pexels-photo-1693085.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",

    postPic:
      "https://images.pexels.com/photos/1842182/pexels-photo-1842182.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    text: "Teddy was just enjoying the sun",
    date: "March 1 2022 at 5:12pm",
    comments: [3],
    likes: 2,
    likers: [1, 2],
    datePosted: new Date("2022-03-01"),
  },
  {
    id: 2,
    status: "public",
    Poster: 7,
    PosterName: "Dr Silva",
    PosterPic:
      "https://cdn.pixabay.com/photo/2021/02/09/06/45/doctor-5997504_960_720.jpg",

    postPic:
      "https://cdn.pixabay.com/photo/2020/12/15/14/38/covid-19-5833844_960_720.png",
    text: "Booster shots now available across Canada",
    date: "Jan 10 2022 at 1:25am ",
    comments: [],
    likes: 2,
    likers: [1, 2],
    datePosted: new Date("2022-01-10"),
  },
  {
    id: 3,
    status: "friends",
    Poster: 11,
    PosterName: "Nick",
    PosterPic:
      "https://cdn.pixabay.com/photo/2016/03/26/22/13/man-1281562_1280.jpg",

    postPic:
      "https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204_960_720.jpg",
    text: "Banff is offering free ski lessons from March 10 to the 16th, I am a newbie myself but would love it if anyone joined me ",
    date: "January 10 2022 at 8:45pm",
    comments: [],
    likes: 2,
    likers: [],
    datePosted: new Date("2022-01-10"),
  },
  {
    id: 4,
    status: "friends",
    Poster: 11,
    PosterName: "Nick",
    PosterPic:
      "https://cdn.pixabay.com/photo/2016/03/26/22/13/man-1281562_1280.jpg",

    postPic:
      "https://cdn.pixabay.com/photo/2017/10/28/07/47/woman-2896389_960_720.jpg",
    text: "We already have 4 people attending, I will be driving so we can all car-pool, anyone care to join  ",
    date: "January 14 2022 at 8:45pm",
    comments: [],
    likes: 2,
    likers: [],
    datePosted: new Date("2022-01-14"),
  },

  {
    id: 5,
    status: "followers",
    Poster: 5,
    PosterName: "Matt",
    PosterPic:
      "https://images.pexels.com/photos/1819483/pexels-photo-1819483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",

    postPic:
      "https://images.pexels.com/photos/463734/pexels-photo-463734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    text: "Enjoying some quite time at the cabin",
    comments: [1, 5],
    date: "March 2 2022 at 2:15pm",
    likes: 2,
    likers: [2, 5],
    datePosted: new Date("2022-03-02"),
  },
  {
    id: 6,
    status: "friends",
    Poster: 6,
    PosterName: "Mitch Wiz",
    PosterPic:
      "https://cdn.pixabay.com/photo/2019/11/10/11/13/couple-4615557_960_720.jpg",
    postPic:
      "https://cdn.pixabay.com/photo/2019/11/10/11/13/couple-4615557_960_720.jpg",
    text: "Happy Anniversary Babe",
    date: "Feb 22 2022 at 11:45pm",
    comments: [2, 4],
    likes: 4,
    likers: [1, 2, 3, 4],
    datePosted: new Date("2022-02-22"),
  },
  {
    id: 7,
    status: "unlisted",
    Poster: 6,
    PosterName: "Mitch Wiz",
    PosterPic:
      "https://cdn.pixabay.com/photo/2019/11/10/11/13/couple-4615557_960_720.jpg",
    postPic:
      "https://cdn.pixabay.com/photo/2019/11/10/11/13/couple-4615557_960_720.jpg",
    text: "Private message",
    date: "Feb 2 2022 at 8:45pm",
    comments: [],
    likes: 4,
    likers: [1, 2, 3, 4],
    datePosted: new Date("2022-02-22"),
  },
];

var Comments = [
  {
    id: 1,
    author: 6,
    name: "Mitch Wiz",
    picture:
      "https://cdn.pixabay.com/photo/2019/11/10/11/13/couple-4615557_960_720.jpg",
    date: "Feb 1",
    post: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
  },
  {
    id: 2,
    author: 5,
    name: "Jimmy",
    picture:
      "https://images.pexels.com/photos/1693085/pexels-photo-1693085.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    date: "Feb 11",
    post: 6,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
  },

  {
    id: 3,
    author: 1,
    name: "Jenny",
    picture:
      "https://images.pexels.com/photos/1090387/pexels-photo-1090387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    date: "Jan 1",
    post: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
  },
  {
    id: 4,
    author: 4,
    name: "James",
    picture:
      "https://images.pexels.com/photos/1693085/pexels-photo-1693085.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    date: "Feb 11",
    post: 6,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
  },
  {
    id: 5,
    author: 4,
    name: "Matt",
    picture:
      "https://images.pexels.com/photos/1819483/pexels-photo-1819483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    date: "Feb 4",
    post: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
  },
];

module.exports = { Profiles, Posts };
