import type { Lesson } from '../types';


export const LESSONS: Lesson[] = [
  // --- ENGLISH LESSONS ---
  {
    id: 'en-home-row-1',
    language: 'english',
    level: 'beginner',
    title: 'English: Home Row Basics (A S D F J K L ;)',
    description: 'Learn the primary rest position keys for left and right hands.',
    targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    content: 'asdf jkl; asdf jkl; a s d f j k l ; dad sad lad fall ask flask salad glad;',
    instructions: 'Keep your fingers resting on A S D F and J K L ; at all times.',
  },
  {
    id: 'en-home-row-2',
    language: 'english',
    level: 'beginner',
    title: 'English: Extending Home Row (G and H)',
    description: 'Reach your index fingers to tap G and H without lifting your wrist.',
    targetKeys: ['g', 'h', 'f', 'j'],
    content: 'fgjh gjgh fghj asdfg hjkl; flag glad half hash dash flash flask slag;',
    instructions: 'Stretch your left index finger for G, and right index finger for H.',
  },
  {
    id: 'en-top-row',
    language: 'english',
    level: 'intermediate',
    title: 'English: Top Row Mastery (Q W E R T Y U I O P)',
    description: 'Reaching up from home row to the top row keys.',
    targetKeys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    content: 'quite write power true water party route poetry properly quality write query report wipe wire',
    instructions: 'Return fingers to the home row immediately after striking the upper keys.',
  },
  {
    id: 'en-speed-paragraphs',
    language: 'english',
    level: 'advanced',
    title: 'English: Fluency & Pro Punctuation',
    description: 'Full sentence flow with capital letters, commas, and periods.',
    content: 'Mastery is not an accident. Consistent daily practice transforms typing from a conscious effort into pure muscle memory, allowing ideas to flow uninterrupted from mind to screen.',
    instructions: 'Use the opposite Shift key for capital letters: right Shift for left hand letters and vice versa.',
  },

  // --- HINDI (DEVANAGARI) LESSONS ---
  {
    id: 'hi-home-row-1',
    language: 'hindi',
    level: 'beginner',
    title: 'हिन्दी: होम रो बुनियादी अभ्यास (अ, ि, ु, प, र, क, त)',
    description: 'इनस्क्रिप्ट होम रो कीज़: बायाँ हाथ (ि, ु, ्) और दायाँ हाथ (प, र, क, त)',
    targetKeys: ['ि', 'ु', '्', 'प', 'र', 'क', 'त'],
    content: 'पक रत कप तर पर कर तपक कपर तरक परक पता कता रता पति रति परि करति',
    instructions: 'बायाँ हाथ D, F, G पर और दायाँ हाथ H, J, K, L पर रखें।',
  },
  {
    id: 'hi-vowels-matras',
    language: 'hindi',
    level: 'intermediate',
    title: 'हिन्दी: मात्राएं और स्वर (मात्रा संयोग)',
    description: 'आकार (ा), ईकार (ी), ऊकार (ू), एकार (े), ऐकार (ै) का अभ्यास।',
    content: 'भारत हमारा प्यारा देश है। यहाँ विभिन्न संस्कृतियों का सुंदर संगम देखने को मिलता है।',
    instructions: 'व्यंजन के बाद मात्रा दबाएँ। इनस्क्रिप्ट में व्यंजन + मात्रा क्रम रहता है।',
  },
  {
    id: 'hi-speed-test',
    language: 'hindi',
    level: 'advanced',
    title: 'हिन्दी: उन्नत गति और संयुक्त अक्षर',
    description: 'ज्ञान, कर्म, प्रकृति और कठिन संयुक्त अक्षरों का तेज प्रवाह।',
    content: 'परिश्रम ही सफलता की कुंजी है। निरंतर अभ्यास से कठिन से कठिन कार्य भी अत्यंत सुगम और स्वाभाविक बन जाता है।',
    instructions: 'हलंत (D की) का प्रयोग करके संयुक्त अक्षर (जैसे क + ् + ष = क्ष) बनाएँ।',
  },

  // --- TELUGU LESSONS ---
  {
    id: 'te-home-row-1',
    language: 'telugu',
    level: 'beginner',
    title: 'తెలుగు: హోమ్ రో అక్షరాలు (ప, ర, క, త, మ, న)',
    description: 'ఇన్‌స్క్రిప్ట్ కీబోర్డ్ హోమ్ రో అక్షరాల ప్రాథమిక సాధన.',
    targetKeys: ['ప', 'ర', 'క', 'త', 'మ', 'న'],
    content: 'పర కత పక రత తప కర మన పన మనన కతన పరక తరణ పనస తపన',
    instructions: 'H (ప), J (ర), K (క), L (త), C (మ), V (న) వేళ్ల అమరిక గమనించండి.',
  },
  {
    id: 'te-guninthalu-drill',
    language: 'telugu',
    level: 'intermediate',
    title: 'తెలుగు: గుణింతాల ప్రాక్టీస్ (తలకట్టు, దీర్ఘం, గుడి, కొమ్ము)',
    description: 'క కా కి కీ కు కూ కె కే కై కొ కో కౌ కం కః క్రమశిక్షణతో సాధన.',
    content: 'క కా కి కీ కు కూ కె కే కై కొ కో కౌ కం కల కాలం కిరణం కీర్తి కుమారుడు కూతురు కెరటం కేకలు కైవారం కొండ కోకిల కౌరవుడు',
    instructions: 'హల్లు (క) తర్వాత ఎడమ చేతి కీలతో తగిన గుణింతపు గుర్తును నొక్కండి.',
  },
  {
    id: 'te-vottulu-drill',
    language: 'telugu',
    level: 'intermediate',
    title: 'తెలుగు: ద్విత్వాక్షరాలు మరియు ఒత్తుల సాధన (్ + హల్లు)',
    description: 'అమ్మ, నాన్న, అక్క, చెల్లి, నిచ్చెన, మల్లెపువ్వు లాంటి ద్విత్వాక్షరాలు.',
    content: 'అమ్మ ప్రేమ అనంతమైనది. నాన్న కష్టం వెలకట్టలేనిది. అక్క చెల్లెల్లు కలిసి చదువుకుంటారు. తమ్ముడు బంతిని విసిరాడు. నిచ్చెన ఎక్కి పువ్వులు కోశారు.',
    instructions: 'ఒత్తు కోసం హల్లు తర్వాత D (పొల్లు ్) నొక్కి మళ్లీ అదే హల్లు నొక్కండి (మ + D + మ = మ్మ).',
  },
  {
    id: 'te-samyuktakshara',
    language: 'telugu',
    level: 'advanced',
    title: 'తెలుగు: సంయుక్తాక్షరాలు (శక్తి, భక్తి, విద్యా, చక్రం)',
    description: 'రెండు వేర్వేరు హల్లుల కలయికతో ఏర్పడే సంయుక్తాక్షరాల వేగ సాధన.',
    content: 'భారతదేశం విద్యా జ్ఞాన సంపదలకు నిలయం. ప్రజలందరి సమైక్యతా శక్తి దేశ ప్రగతికి మూలాధారం. నిరంతర పరిశ్రమ ద్వారా మాత్రమే అత్యున్నత లక్ష్యాన్ని సాధించగలం.',
    instructions: 'క + D + ష = క్ష, త + D + ర = త్ర వంటి సంయుక్తాక్షరాలను సాధన చేయండి.',
  },
  {
    id: 'te-govt-exam',
    language: 'telugu',
    level: 'speedtest',
    title: 'తెలుగు: ప్రభుత్వ టైపింగ్ పరీక్షా నమూనా (Govt Typing Exam)',
    description: 'ఆంధ్రప్రదేశ్ మరియు తెలంగాణ ప్రభుత్వ టైపింగ్ పరీక్షల మోడల్ పాసేజ్.',
    content: 'మానవ జీవితంలో సమయం అత్యంత విలువైనది. గడిచిన క్షణం మళ్లీ తిరిగి రాదు. విద్యార్థులు క్రమశిక్షణతో విద్యను అభ్యసించి సమాజానికి ఆదర్శంగా నిలవాలి. సాంకేతిక పరిజ్ఞానం పెరుగుతున్న ఈ రోజుల్లో మాతృభాషను గౌరవిస్తూ ఆధునిక నైపుణ్యాలను పెంపొందించుకోవడం ప్రతి ఒక్కరి కర్తవ్యం.',
    instructions: 'నిర్ణీత సమయంలో పూర్తి చేయడానికి ప్రయత్నించండి. ఖచ్చితత్వం 95% పైగా ఉండాలి.',
  },

  // --- TAMIL LESSONS ---
  {
    id: 'ta-home-row-1',
    language: 'tamil',
    level: 'beginner',
    title: 'தமிழ்: அடிப்படை எழுத்துக்கள் (க, த, ப, ர)',
    description: 'இன்ஸ்கிரிப்ட் விசைப்பலகை ஹோம் ரோ எழுத்துக்கள் பயிற்சி.',
    targetKeys: ['க', 'த', 'ப', 'ர'],
    content: 'கத பர பக தர பத கப பரத கதக தரக பரப கதர',
    instructions: 'வலது கை விரல்களை H, J, K, L விசை மீது சரியாக வைக்கவும்.',
  },
  {
    id: 'ta-speed-fluency',
    language: 'tamil',
    level: 'intermediate',
    title: 'தமிழ்: வாக்கியங்கள் மற்றும் உயிர்மெய் எழுத்துக்கள்',
    description: 'தமிழ் வாக்கியங்களை பிழையின்றி தட்டச்சு செய்யும் பயிற்சி.',
    content: 'முயற்சி திருவினையாக்கும். நாள்தோறும் முறையாக தட்டச்சு பயிற்சி செய்வதன் மூலம் சிறந்த வேகத்தையும் துல்லியத்தையும் பெறலாம்.',
    instructions: 'மெய்யெழுத்து புள்ளி வைக்க D (்) விசையை அழுத்தவும்.',
  },

  // --- KANNADA LESSONS ---
  {
    id: 'kn-basics',
    language: 'kannada',
    level: 'beginner',
    title: 'ಕನ್ನಡ: ಹೋಮ್ ರೋ ಮತ್ತು ಮೂಲ ಅಕ್ಷರಗಳು (ಪ, ರ, ಕ, ತ)',
    description: 'ಇನ್‌ಸ್ಕ್ರಿಪ್ಟ್ ಕೀಲಿಮಣೆಯ ಮೂಲ ಅಕ್ಷರಗಳ ಅಭ್ಯಾಸ.',
    content: 'ಪರ ಕತ ಪಕ ರತ ತಪ ಕರ ಕತನ ಪರಕ ತಪನ ಕರಗ ರಸ ಕಸ',
    instructions: 'ಹೋಮ್ ರೋ ಕೀಲಿಗಳ ಮೇಲೆ ನಿಮ್ಮ ಬೆರಳುಗಳನ್ನು ವಿಶ್ರಾಂತಿಯಲ್ಲಿಡಿ.',
  },
  {
    id: 'kn-fluency',
    language: 'kannada',
    level: 'intermediate',
    title: 'ಕನ್ನಡ: ವಾಕ್ಯಗಳು ಮತ್ತು ಒತ್ತು ಅಕ್ಷರಗಳು',
    description: 'ಕನ್ನಡ ಭಾಷೆಯಲ್ಲಿ ಸರಾಗವಾಗಿ ಟೈಪ್ ಮಾಡುವ ವಿಧಾನ.',
    content: 'ನಿರಂತರ ಪರಿಶ್ರಮ ಮತ್ತು ಏಕಾಗ್ರತೆ ಯಶಸ್ಸಿನ ಮೂಲ ಮಂತ್ರ. ದಿನನಿತ್ಯದ ಅಭ್ಯಾಸದಿಂದ ಮಾತ್ರ ಉತ್ತಮ ವೇಗ ಸಾಧ್ಯ.',
    instructions: 'ಒತ್ತು ನೀಡಲು D (್) ಕೀಲಿಯನ್ನು ಬಳಸಿ.',
  },

  // --- BENGALI LESSONS ---
  {
    id: 'bn-basics',
    language: 'bengali',
    level: 'beginner',
    title: 'বাংলা: হোম রো প্রাথমিক পাঠ (প, র, ক, ত, ম, ন)',
    description: 'ইনস্ক্রিপ্ট কীবোর্ডের হোম রো অক্ষর অনুশীলন।',
    content: 'পর কত পক রত তপ কর মন পন কতন পরক তপন করম তরল',
    instructions: 'আঙ্গুলগুলি সর্বদা হোম রো-তে স্থির রাখুন।',
  },
  {
    id: 'bn-fluency',
    language: 'bengali',
    level: 'intermediate',
    title: 'বাংলা: বাক্য এবং যুক্তাক্ষর অনুশীলন',
    description: 'ধৈর্য এবং দ্রুততার সাথে বাংলা টাইপিং এর চমৎকার অনুশীলন।',
    content: 'পরিশ্রম এবং ধৈর্য মানুষের সাফল্যের আসল চাবিকাঠি। প্রতিদিন নিয়মিত অনুশীলনের মাধ্যমে সঠিক গতি অর্জন করা সম্ভব।',
    instructions: 'হসন্তের (D) সাহায্যে যুক্তাক্ষর টাইপ করুন।',
  },

  // --- MARATHI LESSONS ---
  {
    id: 'mr-basics',
    language: 'marathi',
    level: 'beginner',
    title: 'मराठी: होम रो पायाभूत सराव (प, र, क, त, म, न)',
    description: 'इनस्क्रिप्ट कीबोर्डवर अचूक बोटांच्या हालचालींची सुरुवात.',
    content: 'पक रत कप तर पर कर तपक कपर तरक परक मन पन करम',
    instructions: 'बोटे योग्य क्रमाने कीबोर्डवर ठेवा आणि स्क्रीनकडे पाहा.',
  },
  {
    id: 'mr-fluency',
    language: 'marathi',
    level: 'intermediate',
    title: 'मराठी: प्रवाही वाक्य आणि जोडशब्द',
    description: 'दैनिक व्यवहारातील वाक्ये आणि जोडशब्दांचा वेगवान सराव.',
    content: 'सतत सराव आणि आत्मविश्वासाने कोणत्याही ध्येयावर मात करता येते. योग्य तंत्राने टाइपिंग शिकल्यास कामाचा वेग कित्येक पटीने वाढतो.',
    instructions: 'जोडाक्षरांसाठी हलंत (D की) वापरा.',
  },

  // --- GUJARATI LESSONS ---
  {
    id: 'gu-basics',
    language: 'gujarati',
    level: 'beginner',
    title: 'ગુજરાતી: હોમ રો મૂળભૂત અક્ષરો (પ, ર, ક, ત, મ, ન)',
    description: 'ઇન્સ્ક્રિપ્ટ કીબોર્ડ પર આંગળીઓની સાચી સ્થિતિ.',
    content: 'પર કત પક રત તપ કર મન પન કતન પરક તપન કરમ તરલ',
    instructions: 'હોમ રો પર આંગળીઓ મૂકીને કી તરફ જોયા વગર ટાઈપ કરો.',
  },
  {
    id: 'gu-fluency',
    language: 'gujarati',
    level: 'intermediate',
    title: 'ગુજરાતી: વાક્ય અને જોડાક્ષર રચના',
    description: 'ગુજરાતી ભાષામાં સહજ અને ઝડપી ટાઈપિંગ કરવાનો અભ્યાસ.',
    content: 'સતત પરિશ્રમ અને ધૈર્યથી દરેક મુશ્કેલ કાર્ય સરળ બને છે. દરરોજ ટાઈપિંગની પ્રેક્ટિસ કરવાથી અદભુત ઝડપ મળે છે.',
    instructions: 'જોડાક્ષર બનાવવા માટે ખોડો અક્ષર (D કી) નો ઉપયોગ કરો.',
  },

  // --- MALAYALAM LESSONS ---
  {
    id: 'ml-fluency',
    language: 'malayalam',
    level: 'intermediate',
    title: 'മലയാളം: വാക്യങ്ങളും അക്ഷരവിന്യാസവും',
    description: 'ഇൻസ്ക്രിപ്റ്റ് രീതിയിൽ മലയാളം വേഗത്തിൽ ടൈപ്പ് ചെയ്യുക.',
    content: 'നിരന്തര പരിശ്രമവും ആത്മവിശ്വാസവുമാണ് വിജയത്തിന് ആധാരം. ദിവസേനയുള്ള പരിശീലനം ടൈപ്പിംഗ് വേഗത വർദ്ധിപ്പിക്കുന്നു.',
    instructions: 'വിരലുകൾ യഥാസ്ഥാനത്ത് ഉറപ്പിച്ചു നിർത്തുക.',
  },

  // --- PUNJABI LESSONS ---
  {
    id: 'pa-fluency',
    language: 'punjabi',
    level: 'intermediate',
    title: 'ਪੰਜਾਬੀ (ਗੁਰਮੁਖੀ): ਅੱਖਰ ਜੋੜ ਅਤੇ ਵਾਕ',
    description: 'ਗੁਰਮੁਖੀ ਇਨਸਕ੍ਰਿਪਟ ਕੀਬੋਰਡ ਨਾਲ ਸੁਚੱਜੀ ਟਾਈਪਿੰਗ ਅਭਿਆਸ।',
    content: 'ਲਗਾਤਾਰ ਮਿਹਨਤ ਅਤੇ ਲਗਨ ਨਾਲ ਹਰ ਮੁਸ਼ਕਲ ਆਸਾਨ ਹੋ ਜਾਂਦੀ ਹੈ। ਰੋਜ਼ਾਨਾ ਅਭਿਆਸ ਨਾਲ ਟਾਈਪਿੰਗ ਦੀ ਗਤੀ ਅਤੇ ਸ਼ੁੱਧਤਾ ਵੱਧਦੀ ਹੈ।',
    instructions: 'ਸਹੀ ਉਂਗਲਾਂ ਦੀ ਵਰਤੋਂ ਨਾਲ ਸਹੀ ਕੁੰਜੀਆਂ ਦਬਾਓ।',
  },

  // --- ODIA LESSONS ---
  {
    id: 'or-fluency',
    language: 'odia',
    level: 'intermediate',
    title: 'ଓଡ଼ିଆ: ପ୍ରାଥମିକ ବର୍ଣ୍ଣ ଏବଂ ବାକ୍ୟ ଗଠନ',
    description: 'ଇନସ୍କ୍ରିପ୍ଟ କୀବୋର୍ଡ ସହିତ ଓଡ଼ିଆ ଟାଇପିଂ ପ୍ରଶିକ୍ଷଣ।',
    content: 'କଠିନ ପରିଶ୍ରମ ଓ ଧୈର୍ଯ୍ୟ ଦ୍ୱାରା ପ୍ରତ୍ୟେକ ଲକ୍ଷ୍ୟ ହାସଲ ହୁଏ। ନିୟମିତ ଅଭ୍ୟାସ ଦ୍ୱାରା ଉତ୍କୃଷ୍ଟ ଗତି ହାସଲ ହୁଏ।',
    instructions: 'ସଠିକ ଆଙ୍ଗୁଠି ସ୍ଥାନୀୟତା ବଜାୟ ରଖନ୍ତୁ।',
  },
];
