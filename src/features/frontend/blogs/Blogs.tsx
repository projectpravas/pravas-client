import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import * as React from "react";
import BlogDetails from "./BlogDetails";
import BlogPost from "./BlogPost";
import Pagination from "./Pagination";

const data = [
  {
    id: 13,
    image:
      "https://pravasthejourney.com/wp-content/uploads/2023/01/Mount-Abu-580x450.webp",
    largeImage:
      "https://pravasthejourney.com/wp-content/uploads/2023/01/Mount-Abu.webp",
    title: "Mount Abu Summer Festival 2023",
    desc: "A state adorned with deserts, hill stations, royal palaces, ancient forts, and color themed cities,",
    blog: [
      {
        heading: "Mount Abu Summer Festival 2023",
        desc: `A state adorned with deserts, hill stations, royal palaces, ancient forts, and color themed cities, Rajasthan is a bewitching land of India that stands true to its tourism department’s tagline – ‘The Incredible state of India’. It caters to the spectators around the world and homeland alike, for its vibrant culture, festivals and art forms throughout the year. This blog will explore one such events that lightens up the otherwise scorching Rajasthan in summertime – Mount Abu Summer Fest. 

        This 3 day carnival is held on Buddha Pournima every year by joint efforts of The Rajasthan Tourism Municipal Board, Mt.Abu & District Administration. It is organized at Mount Abu, a hill station located at a height of 1722 metres above the sea level and covered by lushy greenery of Aravalli hills. This scenic beauty is gifted with steep rocks, tranquil lakes, a picturesque backdrop, and a favorable climate which make it a perfect spot for the festival. 
        
        This year, the festival will be held from 13 May to 15 May 2023. The affair is much awaited occasion for visitors, folk art enthusiasts, and artists who get decked up to entertain their audience. This event hosts Rajasthani as well as Gujarati art professionals who represent their respective cultures and folklores. `,
      },
      {
        heading: "Highlights of Mount Abu Summer festival ",
        desc: `The festival starts with a beautiful procession from RTDC Hotel Shikhar and proceed towards Nakki Lake Chowk, which is the event spot for next two days. The inaugration witnesses energetic and intriguing Ballad performance, wherein the singers narrate the stories of folk heroes and legendary lovers.

        This is followed by wonderful folk dances like Gair,and Ghoomar. Major attraction of this festival are the outdoor games like horse racing, tug of war, skating races, panihari matka race, and boat races in and around Nakki Lake that test the competitive and enthusiastic spirit of the participants as well as the viewers. Apart from that, CRPF band holds an enthralling show matching their otherwise robust energy. The onlookers can also enjoy a much enchanting Shaam-E-Qawwali that bestows the audience with ultimate charm and happiness. Its worth the experience! 
        
        If you are thinking of taking a summer trip to Rajasthan, make sure you visit this festival once and celebrate it along with localities and fellow travellers with you. The Rajasthani cuisine and warm hospitality at restaurants and luxurious stays is cherry on top of the experience. Moreover, you can bring back some ethnic Rajasthani apparels and showpieces to your home. 
        
        You can book a taxi from Udaipur airport to reach the hill station. It is 185 kms away from Mount Abu. Buses are also available from the airport and railway station. The nearest train station is Abu Road railway station that is 28 km away. 
        Plan your Rajasthan tour with Pravas and get to know more about the places worth a visit around Mount Abu as well. Click here for package information`,
      },
    ],
  },
  {
    id: 1,
    image:
      "https://pravasthejourney.com/wp-content/uploads/2023/01/River-Rafting-in-Kashmir-580x450.webp",
    largeImage:
      "https://pravasthejourney.com/wp-content/uploads/2023/01/River-Rafting-in-Kashmir.webp",
    title: "Places to visit for River Rafting in Kashmir",
    desc: "Rafting is one of those adrenaline pumping adventures that allows you to face off your",
    blog: [
      {
        heading: "Places to visit for River Rafting in Kashmir",
        desc: `Rafting is one of those adrenaline pumping adventures that allows you to face off your fears and brings forth the most enriching outdoor experience, if you love challenging your mind and body through extreme recreational activities. The rush of flowing cold water hitting your face while you are making your way through the curves and the feeling of falling off the raft amidst a waterfall, however big or small, is what most of the rafting enthusiasts seek. 
  
        It will be an add on treat if you venture into this sport in the mighty, and scenic beauty of Kashmir. This valley accommodates rivers like Lidder, Sindh, and Zanaskar, that are well-known for hosting this adventure sport. 
        
        Before you plunge in for more information about these places, lets get a brief about what this sport is about.`,
      },
      {
        heading: "What is River Rafting?",
        desc: `Rafting is a water sport wherein a team of rafters uses the double blades to move the inflatable raft to reach the destination first as compared to their competitors. This race takes place on rough or white waters of different degrees. It can be enjoyed by an individual as much as it is done by a team. The participant whose raft touches the finishing line first is declared as the winner. River rafting has 6 levels or grades of difficulty as it is said – Easy, Novice, Intermediate, Advanced, Expert and Extreme grade.

        Easy grade is the beginner level having low risks and least obstructions. Novice is also easy and can be attempted by the starters who have never done river rafting before. The challenges get tougher with intermediate grade as you should expect strong waves during the race and be able to control the raft while you row through that turbulence. 
        
        Advanced grade is one step up the intermediate hence more difficult and you got to be skilled at rafting, and experienced enough to face lot of roughness of the water waves. Expert grade requires you to deal with uncertain risks whereas the last and most demanding level is Extreme grade where the threats are higher and there is no scope for error. 
        
        Gender barrier does not exist in this sport. However, one should be above 12 year old because river rafting in Kashmir is very advanced and difficult than other parts of the country. This is the age limit decided by the authorities conducting this activity.`,
      },
      {
        heading: "Best places for River Rafting in Kashmir",
        desc: `You can enjoy rafting in Pahalgam, Sonamarg, and Kargil which host Lidder river, Sindh river and Zanskar river respectively. A composed and calm mind with a healthy body to row the raft from the beginning towards the end in the presence of cold water attacking your body and the uncertain waves challenging your moves throughout the race.`,
      },
      {
        heading: "Rafting on Lidder river",
        desc: `Lidder stretches from Langabal to Gameshpora covering approx. 12 kms of distance and situated amidst a scenic greenery and rocky terrain of Pahalgam. It has all the four grades available for the participants. However, Lidder river is well-known for its sharp turns with highs and lows that makes it considerably the toughest spot to explore river rafting. 

        The stretch is further divided into three lengths:
        
        The Lider Joy Ride (2.5 km) that is between Varganpal and Yaneer Bridge and has rapids ranging up to III. This is appropriate for beginner level rafters. 
        The Lider Long Ride (5 km), that is between Varganpal and Ganeshpora and has rapids ranging up to III. This can also go for beginners. 
        The Lider Xtra Long Ride (12 km), that is from Langabal to Ganeshpora and has rapids ranging up to IV. This length is considered to be perfect for expert rafters. 
        Summer season is the best time to visit Pahalgam for river rafting since the temperature is around 16°C to 22°. The place has a warm temperature, blessed with clear blue skies and cold evenings. However, this is also peak season of tourism so it could be crowdy in Pahalgam. The rivers are gushing with water and summers offers ideal weather for river rafting in Pahalagam. 
        
        Pahalgam is just 90.8 KM distance from Srinagar. It is also the base camp of the holy Amarnath Cave Yatra and has several hotel accommodation, that offer safe and secure stay in summers as well as winters.`,
      },
      {
        heading: "Rafting on Sindh river",
        desc: `Sindh river, flowing through Sonamarg, offers similar level of difficulties alike Lidder river. Its harsh terrains, coupled with rapid turns, amplifies the adventure. Indus is considerably risky because of its fast rush and white water. The rocky surface makes it harder to row the raft in the intended direction.

        This stretch is divided in three lengths : 
        
        The first and the easiest Sindh Joy Ride, is approximately 3.5 kilometers and is suitable for beginners. 
        Next ride is about 7 kilometers and can be experienced by novices. 
        The most adventurous ride is the Sindh Extra Long Ride, almost a distance of 24 kilometers and has rapids ranging from II to IV and would be perfect for intermediate to expert level rafters. 
        It is recommended to visit Sonamarg for rafting in transition months between Summer and Monsoon which commences in the region from June and lasts till the end of September.`,
      },
      {
        heading: "Rafting on Zanskar river",
        desc: `If you are taking a trip to Leh, then you might as well consider rafting in Zanskar, that is reviewed as the toughest terrain to experience this adventure sport. Likely, you are supposed be expert in rafting and open for difficult challenges that come up during the sport. It is situated on the Leh – Kargil route, near Ladakh Union Territory. 

        In the 24-kilometer section of the Zanskar River, there are around twelve rapids and a few whirlpools. There is a shorter, and gentler one of about  8-12 kilometers long and has only 3 or 4 rapids. The lengthier one is full of excitement and adventure. However, as the rivers include rapids ranging from level 1 to level 4, you may select the rapid based on the amount of difficulty you are ready to tackle. You can visit Zanskar for river rafting during summers.`,
      },
      {
        heading: "Safety measures to take during River Rafting",
        desc: `Rafting is a demanding water sport, both physicallyn and mentally. Even the high skilled rafters should consider following precautions during the sport : 

        Never remove the life jacket 
        Go through the instructions given by authorities properly 
        Wear comfortable clothes and sports shoes. Avoid wearing any kind of jewelry during the race. 
        Stay hydrated always 
        Keep your hands on T-grip 
        Visit the places according to the recommended weather for rafting since it will be good for your health and you can thoroughly get the best out of sport. 
        All the life-saving equipment will be provided by the coaches and organizers. Keep it safe and secure. Avoid wear and tear of those equipments. You don’t need to buy anything on your own prior to the visit. 
        Anyone with a Serious Medical Issue like Asthama, Heart Problemand differently abeled people are not eligible for Rafting.`,
      },
      {
        heading: "Frequently asked questions about River Rafting in Kashmir",
        desc: `What is the price for river rafting in Kashmir? 
        The estimated cost of rafting is usually anywhere between Rs.1800 to Rs.3500 in Pahalgam and Sonamarg. Depending on the duration of the trip and the difficulty you have selected, the prices will vary. Rafting can be even more expensive if you visit the Zanskar Mountains course for the most difficult rafting trip in the entire valley. The prices are clearly above Rs.4000 or more.
        
        What is the duration of river rafting session in Kashmir? 
        It depends on the distance you are covering and weather condition of that day. It can take anywhere between 30 minutes to even 2 hours depending upon these factors. 
        
        You can enjoy these thrill rides and also pay a visit to other scenic beauty present around these spots. Pravas has best affordable packages that can show you all around and give you a great experience to cherish forever. Click here to know more Kashmir packages and contact us if you want to book a trip for you!  `,
      },
    ],
  },
  {
    id: 2,
    image:
      "https://pravasthejourney.com/wp-content/uploads/2023/01/Tulip-Festival-Kashmir-2023-580x450.webp",
    largeImage:
      "https://pravasthejourney.com/wp-content/uploads/2023/01/Tulip-Festival-Kashmir-2023.webp",
    title: "Kashmir Tulip Festival 2023",
    desc: "What is the Kashmir Tulip Festival? The Tulip festival is an annual celebration organized by",
    blog: [
      {
        heading: "Kashmir Tulip Festival 2023",
      },
      {
        heading: "What is the Kashmir Tulip Festival?",
        desc: `The Tulip festival is an annual celebration organized by the Government of Jammu and Kashmir to promote tourism and aims to showcase the range of flowers in the Indira Gandhi Memorial Garden, also known as Kashmir Tulip Garden. It takes place during the onset of the spring season in Kashmir valley.

        The Kashmir Tulip Garden is the largest in Asia. Situated at the foothills of the Zabarwan Mountain Range in Srinagar, it is spread over approximately 30 hectares. Unparalleled both in its expanse and diversity, it has more than 20 lakh tulips of over 45 varieties.
        
        Overlooking the famous Dal Lake of Kashmir, this garden has been an important cultural and natural landmark since it was opened in 2007 to boost floriculture and tourism in Kashmir. Since then, it has become a must-see for all kinds of nature lovers who visit Kashmir. `,
      },
      {
        heading: "When does the Tulip Festival take place?",
        desc: `It is hosted in Srinagar during the onset of Spring. This is the season when the tulips are in full bloom, thus making for a spectacular sight. The period for the Tulip Festival in 2023 will be commencing on 25th March. The bloom remains for 15-20 days from the last week of March to mid-April, depending upon the weather conditions. The best time to visit this garden is in mid-April when the tulips are fully in bloom and are spread over the region like a colorful blanket. `,
      },
      {
        heading: "What are the highlights of the Tulip Festival?",
        desc: `As mentioned before, Srinagar’s Tulip Garden is the largest tulip plantation in Asia, which makes it a very unique and beautiful visual to behold. Once known as the Model Floriculture Centre, the garden is home to a variety of flowering species, apart from tulips. Rare and beautiful flowers like daffodils, narcissus, hyacinths, and ranunculus can also be spotted here. 

        However, the main attraction of the garden is the tulips. There is innumerable variation of tulips available in the garden and when they are in full bloom during the spring, it is a sight that would entice anyone. The sweet smell of the garden, the rows upon rows of colorful flowers, and the mild and mellow weather make for a perfect day trip for nature lovers and flower aficionados. 
        
        Some of the varieties of tulips that can be seen in the garden during the festival are double-bloom tulips, parrot tulips, fringed tulips, bi-color tulips, Rembrandt tulips, fosteriana tulips, lily-flowering tulips, single late tulips, triumph tulips and many more. Tourists can get smitten by an unending plethora of colorful flowers, and can also take advantage of the facilities provided at the festival. 
        
        The tulip flowers planted in the Indira Gandhi Memorial Garden were imported from Holland. Moreover, it is designed in a way that anyone can see the parallel rows of bright-colored tulips lined up in just one glimpse. Carved out of seven terraces, the garden looks like a tilted ground that gives you a view of the entire garden from all directions. 
        
        Clean and comfortable washrooms, free Wi-Fi, fountains, and drinking and rest points are all provided for the comfort of visitors. They can also indulge in some shopping and buy souvenirs and handicrafts from the stalls placed near the garden. They can indulge in authentic Kashmiri cuisine at nearby food stalls and hotels. `,
      },
      {
        heading: "What other places can you visit near the Tulip Garden?",
        desc: `While visiting the Tulip Festival in Srinagar, tourists can also take detours to nearby attractions. The park is surrounded by natural and cultural sites that can appeal to tourists of all kinds. The Chashme Shahi Garden is renowned for the natural spring that flows from it. The Pari Mahal is a historic monument that used to be a Buddhist Monastery. The Mughal Gardens and Shalimar Bagh are iconic Mughal monuments that are rich in heritage as well as natural beauty. 

        Similarly, tourists can visit Dal Lake, Nishat Garden, or Nagin Lake to take in the stunning sights there. Hazratbal, a sacred Muslim shrine provides a peaceful and spiritual experience. For those who wish to take back souvenirs and handicrafts, there are local markets near the Tulip Garden, where you can buy authentic shawls, carpets, rugs, and woolen clothes. `,
      },
      {
        heading: "How to reach Tulip Garden?",
        desc: `By road – You can opt for a regular bus service from Lal Chowk Srinagar at a minimal fare. The nearest bus stop to the garden is on Boulevard road near Cheshma Shahi crossing at a walking distance of about 900m from the Tulip Garden. 

        Srinagar is well-connected with cities like Jammu, Delhi, and Chandigarh. You should opt for JKSRTC buses to reach Srinagar and reach the destination. A shared taxi can be also hired from Lal Chowk or Dal Gate to reach the nearest bus stop on Boulevard road. 
        
        By Air – Deboard at the Sheikh Ul-Alam International Airport in Srinagar. The airport is well-connected with major domestic destinations and is 19km away from the garden. One can hire buses or private/shared taxis from the airport to reach Tulip Garden.
        
        By Train – If you want to travel by train, you can either get off at Jammu Tawi or Udhampur railway station. They are well-connected with prominent cities in India. You can take private taxis or state government buses to reach Tulip Garden from the railway station. Trains are frequent from major Indian railheads. `,
      },
      {
        heading: "Entry fee for Kashmir Tulip Festival",
        desc: `For children – INR 25  

        For adults – INR 50 `,
      },
      {
        heading: "Timings of Kashmir Tulip Festival",
        desc: `The exhibition of colorful tulips starts at 9 AM and gates are closed at 7 PM. 

        We can ensure you get the most out of this vibrant event and much more from the heavenly valleys of Kashmir. Check out the Kashmir tour package by Pravas for further details. We are waiting to serve you with the best deal and set you up for a great tour. `,
      },
    ],
  },
  {
    id: 3,
    image:
      "https://pravasthejourney.com/wp-content/uploads/2023/01/Tour-Operator-in-pune-580x450.webp",
    title: "Tour Operator in Pune",
    desc: "Travelling is possibly the most liberating experience one can ever have if one is open",
  },
  {
    id: 4,
    image:
      "https://pravasthejourney.com/wp-content/uploads/2022/11/Rajasthan-tour-and-travel-consultant-in-Pune-580x450.webp",
    title: "Rajasthan tour and travel consultant in Pune",
    desc: "Globetrotters, brace yourself to explore the Land of kings. Know when and what with this",
  },
  {
    id: 5,
    image:
      "https://pravasthejourney.com/wp-content/uploads/2022/11/Kerala-travel-consultant-580x450.webp",
    title: "Kerala tour and travel consultant in Pune",
    desc: "Are you looking forward to taking a trip to Kerala post-pandemic? Heres what you should",
  },
  {
    id: 6,
    image:
      "https://pravasthejourney.com/wp-content/uploads/2022/07/Leh-ladakh-tours-from-pune-580x450.jpg",
    title: "Is July good time to visit Leh?",
    desc: "What is the best season to visit Leh-Ladakh? The best season to visit Leh-Ladakh is",
  },
  {
    id: 7,
    image:
      "https://pravasthejourney.com/wp-content/uploads/2022/07/shikara-boat-ride-at-kashmir-tour-from-pune-580x450.png",
    title: "The best time to travel to Kashmir",
    desc: "Kashmir is one of the most popular travel destinations in our country. With boundless natural",
  },
  {
    id: 8,
    image:
      "https://pravasthejourney.com/wp-content/uploads/2022/07/Leh-group-tours-from-pune-580x450.jpg",
    title: "Trip to Leh from Pune",
    desc: "Leh is one of the most unique and beautiful places in the country. With its",
  },
  {
    id: 9,
    image:
      "https://pravasthejourney.com/wp-content/uploads/2021/09/KASHMIR2-580x450.jpg",
    title: "Kashmir Tour & travel consultant in Pune",
    desc: "Often referred to as heaven on earth, Kashmir has been one of the most popular",
  },
  {
    id: 10,
    image:
      "https://pravasthejourney.com/wp-content/uploads/2022/06/TadobaS5-580x450.jpg",
    title: "The best season for Tadoba Wildlife Safari",
    desc: "Tadoba National Park, also known as the ‘Jewel of Vidarbha’ is a must-see destination. With",
  },
  {
    id: 11,
    image:
      "https://pravasthejourney.com/wp-content/uploads/2022/06/Pravas-post-580x400.jpg",
    title: "Pravas – The Journey",
    desc: "Pravas was founded by Ajit Ashok Takalkar, a life-long seeker of adventure and travel. With more",
  },
  {
    id: 12,
    image:
      "https://pravasthejourney.com/wp-content/uploads/2020/12/TadobaB1-580x400.jpg",
    title: "Tadoba the land of Tigers",
    desc: "Tadoba the land of Tigers. Tadoba Andhari Tiger Reserve one of the oldest reserve in India. Started",
  },
];

interface IBlogsProps {}

const Blogs: React.FunctionComponent<IBlogsProps> = (props) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage] = React.useState(3);
  const [currentBlog, setCurrentBlog] = React.useState();

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  console.log("Blog id: ", currentBlog);
  // console.log("current Page : ", currentPage);

  const singleBlogData = data.find((obj) => obj?.id == currentBlog);

  return (
    <>
      <Container>
        <Grid container padding={1} paddingY={8} justifyContent="space-evenly">
          {Array.isArray(currentPosts) &&
            currentPosts.map((blog, i) => (
              <Grid item xs={12} sm={6} md={4} key={blog?.title + i}>
                <BlogPost
                  id={blog?.id}
                  image={blog?.image}
                  title={blog?.title}
                  desc={blog?.desc}
                  setCurrentBlog={setCurrentBlog}
                />
              </Grid>
            ))}
        </Grid>
        <Pagination
          totalPosts={data.length}
          postsPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
        />
      </Container>
      <BlogDetails data={singleBlogData} />
    </>
  );
};

export default Blogs;
