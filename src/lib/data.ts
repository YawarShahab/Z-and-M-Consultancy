export const studyData = [
    {
      course_title: "Doctor of Philosophy in Animal Biosciences",
      university: "University of Guelph",
      country: "Canada",
      study_level: "Research",
      duration: "4 Years",
      annual_tuition: "USD 30,450",
      application_fee: "-",
      intake_months: ["January", "September"],
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop"
    },
    {
      course_title: "Bachelor of Science in Computer Science",
      university: "University of Essex",
      country: "United Kingdom",
      study_level: "Undergraduate",
      duration: "3 Years",
      annual_tuition: "GBP 18,750",
      application_fee: "-",
      intake_months: ["October"],
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
    },
    {
      course_title: "Master of Business Administration",
      university: "Kent State University",
      country: "United States",
      study_level: "Postgraduate",
      duration: "2 Years",
      annual_tuition: "USD 19,968",
      application_fee: "-",
      intake_months: ["January", "August"],
      image: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=1200&auto=format&fit=crop"
    },
    {
      course_title: "Master of Science in Bioinformatics",
      university: "University of Essex",
      country: "United Kingdom",
      study_level: "Postgraduate",
      duration: "1 Year",
      annual_tuition: "GBP 18,750",
      application_fee: "-",
      intake_months: ["October"],
      image: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=1200&auto=format&fit=crop"
    },
    {
      course_title: "Bachelor of Arts in Psychology",
      university: "South Dakota State University",
      country: "United States",
      study_level: "Undergraduate",
      duration: "4 Years",
      annual_tuition: "USD 19,622",
      application_fee: "-",
      intake_months: ["August"],
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
    },
    {
      course_title: "Bachelor of Engineering in Civil",
      university: "Colorado State University",
      country: "United States",
      study_level: "Undergraduate",
      duration: "4 Years",
      annual_tuition: "USD 28,182",
      application_fee: "50",
      intake_months: ["August", "January"],
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
    },
    {
      course_title: "Master of Science in Computer Science",
      university: "Colorado State University",
      country: "United States",
      study_level: "Postgraduate",
      duration: "2 Years",
      annual_tuition: "USD 28,182",
      application_fee: "50",
      intake_months: ["August", "January"],
      image: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=1200&auto=format&fit=crop"
    },
    {
      course_title: "PhD in Electronic Engineering",
      university: "Royal Holloway University of London",
      country: "United Kingdom",
      study_level: "Research",
      duration: "3 Years",
      annual_tuition: "GBP 22,300",
      application_fee: "-",
      intake_months: ["September"],
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop"
    },
    {
      course_title: "Bachelor of Information Technology",
      university: "University of Melbourne",
      country: "Australia",
      study_level: "Undergraduate",
      duration: "3 Years",
      annual_tuition: "AUD 45,000",
      application_fee: "100",
      intake_months: ["February", "July"],
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
    },
    {
      course_title: "Master of Data Science",
      university: "University of Sydney",
      country: "Australia",
      study_level: "Postgraduate",
      duration: "2 Years",
      annual_tuition: "AUD 48,000",
      application_fee: "125",
      intake_months: ["February", "August"],
      image: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=1200&auto=format&fit=crop"
    },
    {
      course_title: "Bachelor of Engineering",
      university: "University of Auckland",
      country: "New Zealand",
      study_level: "Undergraduate",
      duration: "4 Years",
      annual_tuition: "NZD 42,000",
      application_fee: "-",
      intake_months: ["February", "July"],
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
    },
    {
      course_title: "Master of Environmental Science",
      university: "University of Otago",
      country: "New Zealand",
      study_level: "Postgraduate",
      duration: "2 Years",
      annual_tuition: "NZD 38,000",
      application_fee: "-",
      intake_months: ["February", "July"],
      image: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=1200&auto=format&fit=crop"
    }
];

const LEVEL_IMAGES: Record<string, string> = {
  "Research": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop",
  "Undergraduate": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
  "Postgraduate": "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=1200&auto=format&fit=crop",
  "Diploma": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
  "Foundation": "https://images.unsplash.com/photo-1491845316042-6d99e0205109?q=80&w=1200&auto=format&fit=crop"
};

// Helper to generate large mock data for demonstration
export const getLargeStudyData = (count: number) => {
  const baseData = studyData;
  const result = [];
  const subjects = ["Data Science", "Artificial Intelligence", "Cyber Security", "Finance", "Marketing", "Psychology", "Mechanical Engineering", "Civil Engineering", "Biotechnology", "Economics", "Law", "International Relations", "Education", "Nursing", "Accounting", "Fashion Design", "Architecture", "Fine Arts", "Robotics", "Renewable Energy"];
  
  for (let i = 0; i < count; i++) {
    const base = baseData[i % baseData.length];
    const study_level = base.study_level;
    const subject = subjects[i % subjects.length];
    
    // Generate more realistic titles
    let title = base.course_title;
    if (i >= baseData.length) {
        const prefix = study_level === "Research" ? "Doctor of Philosophy in" : 
                       study_level === "Undergraduate" ? "Bachelor of Science in" : 
                       study_level === "Postgraduate" ? "Master of Science in" : 
                       study_level === "Diploma" ? "Diploma in" : "Foundation in";
        title = `${prefix} ${subject}`;
    }

    result.push({
      ...base,
      id: i + 1,
      course_title: title,
      image: LEVEL_IMAGES[study_level] || "https://images.unsplash.com/photo-1491845316042-6d99e0205109?q=80&w=1200&auto=format&fit=crop"
    });
  }
  return result;
};

export const institutions = [
  {
    id: "guelph",
    name: "University of Guelph",
    country: "Canada",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=1200&auto=format&fit=crop",
    description: "A leading research-intensive university in Canada.",
    longDescription: "The University of Guelph is one of Canada's top comprehensive universities, known for its excellence in the arts, sciences, business, and agricultural studies. Located in Guelph, Ontario, the university offers a supportive environment with a strong focus on community and innovation.",
    stats: {
      students: "29,000+",
      founded: "1964",
      ranking: "#1 in Canada for Student Satisfaction"
    }
  },
  {
    id: "essex",
    name: "University of Essex",
    country: "United Kingdom",
    logo: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop",
    description: "Ranked among the top universities in the UK for social sciences.",
    longDescription: "The University of Essex is a world-renowned institution with a strong emphasis on research and social responsibility. It has a diverse international community and offers a wide range of programs in humanities, social sciences, and science and health.",
    stats: {
      students: "15,000+",
      founded: "1963",
      ranking: "Top 40 in UK"
    }
  },
  {
    id: "kent-state",
    name: "Kent State University",
    country: "United States",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop",
    description: "A world-class public research university in Ohio.",
    longDescription: "Kent State University is one of Ohio's largest public universities, offering more than 300 academic programs. It is recognized for its excellence in nursing, business, and fashion design, and is committed to student success and global engagement.",
    stats: {
      students: "38,000+",
      founded: "1910",
      ranking: "Top Tier National University"
    }
  },
  {
    id: "colorado-state",
    name: "Colorado State University",
    country: "United States",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop",
    description: "Focused on research, teaching, and service to the community.",
    longDescription: "Colorado State University is a premier public research university located in Fort Collins. It is known for its world-class research in veterinary medicine, atmospheric science, and clean energy, providing students with hands-on learning experiences.",
    stats: {
      students: "33,000+",
      founded: "1870",
      ranking: "#1 in US for Sustainability"
    }
  }
];

export const destinations = [
  {
    name: "United States",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=1200&auto=format&fit=crop",
    description: "The land of opportunity with world-renowned universities.",
    generalInfo: "The United States is home to some of the world's most prestigious universities and offers a diverse range of programs and cultural experiences. It is known for its academic excellence, cutting-edge research, and vibrant campus life."
  },
  {
    name: "Canada",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1200&auto=format&fit=crop",
    description: "High-quality education and diverse cultural experience.",
    generalInfo: "Canada is recognized globally for its high standards of education and welcoming atmosphere for international students. It offers a safe environment, post-study work opportunities, and a high quality of life."
  },
  {
    name: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop",
    description: "Historic institutions and academic excellence.",
    generalInfo: "The UK is famous for its historic universities like Oxford and Cambridge. It provides world-class education with shorter course durations compared to other countries, making it a cost-effective choice for many students."
  },
  {
    name: "Australia",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1200&auto=format&fit=crop",
    description: "Globally recognized degrees in a beautiful setting.",
    generalInfo: "Australia offers a unique lifestyle combined with exceptional education. It is known for its research facilities, diverse student population, and strong emphasis on practical learning and innovation."
  },
  {
    name: "China",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1200&auto=format&fit=crop",
    description: "World-class universities and a thriving academic environment.",
    generalInfo: "China has rapidly grown into one of the top destinations for international students, offering world-class universities, advanced research facilities, and a rich cultural experience. Many programs are offered in English, and scholarships are widely available."
  },
  {
    name: "New Zealand",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=1200&auto=format&fit=crop",
    description: "World-class education in a safe and stunning environment.",
    generalInfo: "New Zealand provides a supportive learning environment with a focus on personal growth and innovation. Its stunning landscapes and outdoor lifestyle make it an attractive destination for students seeking adventure alongside their studies."
  }
];
