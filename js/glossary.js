// ============================================================================
// GLOSSARY MODULE - Firestore-Ready Architecture
// ============================================================================
// This module manages the glossary data and UI.
// Data storage is designed to easily migrate to Firestore.
// ============================================================================

class GlossaryManager {
    constructor() {
        this.currentCategory = null;
        this.searchTerm = '';
        this.glossaryData = this.initializeGlossaryData();
        this.categories = this.initializeCategories();
        
        // Firestore configuration
        this.useFirestore = true; // Enable Firestore data fetching
        this.firestoreCollection = 'glossary'; // Collection name for Firestore
    }

    /**
     * Initialize glossary categories
     * Each category will have its own Firestore subcollection in the future
     */
    initializeCategories() {
        return [
            {
                id: 'species',
                title: 'Species',
                icon: '🐟',
                description: 'Fish species information and care guides',
                imageUrl: null,
                firestoreSubcollection: 'species_entries' // For future Firestore migration
            },
            {
                id: 'diseases',
                title: 'Diseases',
                icon: '🏥',
                description: 'Common fish diseases and treatments',
                imageUrl: null,
                firestoreSubcollection: 'disease_entries'
            },
            {
                id: 'equipment',
                title: 'Equipment',
                icon: '🔧',
                description: 'Aquarium equipment and supplies',
                imageUrl: null,
                firestoreSubcollection: 'equipment_entries'
            },
            {
                id: 'terminology',
                title: 'Terminology',
                icon: '📖',
                description: 'Aquarium terms and definitions',
                imageUrl: null,
                firestoreSubcollection: 'terminology_entries'
            }
        ];
    }

    /**
     * Initialize glossary data structure
     * In the future, this will be loaded from Firestore
     */
    initializeGlossaryData() {
        return {
            species: [
                {
                    id: 'neon-tetra',
                    title: 'Neon Tetra',
                    scientificName: 'Paracheirodon innesi',
                    description: 'A small, peaceful freshwater fish known for its bright blue and red coloration. Native to South American blackwater streams. Perfect for community tanks and schooling behavior.',
                    imageUrl: null,
                    tags: ['Beginner Friendly', 'Schooling Fish', 'Peaceful', 'Small'],
                    category: 'species',
                    author: 'System',
                    created: new Date().toISOString(),
                    // Firestore-ready fields
                    firestoreId: null,
                    userId: null, // Will be populated with Firebase Auth UID
                    upvotes: 0,
                    verified: true
                },
                {
                    id: 'betta-fish',
                    title: 'Betta Fish (Siamese Fighting Fish)',
                    scientificName: 'Betta splendens',
                    description: 'A colorful labyrinth fish known for its flowing fins and territorial behavior. Males are aggressive toward other males. Can breathe air from the surface. Prefers warm water (76-82°F).',
                    imageUrl: null,
                    tags: ['Colorful', 'Territorial', 'Labyrinth Fish', 'Easy Care'],
                    category: 'species',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },
                {
                    id: 'corydoras-catfish',
                    title: 'Corydoras Catfish',
                    scientificName: 'Corydoras spp.',
                    description: 'Bottom-dwelling catfish that help keep substrate clean. Social fish that should be kept in groups of 6+. Very peaceful and great for community tanks. Multiple species available.',
                    imageUrl: null,
                    tags: ['Bottom Dweller', 'Schooling Fish', 'Peaceful', 'Algae Eater'],
                    category: 'species',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },
                // === NEW SPECIES ENTRIES (140 additional fish species) ===
    {
        id: 'african-butterfly-cichlid',
        title: 'African Butterfly Cichlid',
        scientificName: 'Anomalochromis thomasi',
        description: 'African Butterfly Cichlid are peaceful medium-sized fish growing to 4 inches. They should be kept in groups for best health and behavior. African Butterfly Cichlid are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'african-butterfly-fish',
        title: 'African Butterfly Fish',
        scientificName: 'Pantodon buchholzi',
        description: 'African Butterfly Cichlids are small, peaceful, and attractive cichlids with elaborate courtship displays and pair bonding. They\'re semi-aggressive during breeding but generally peaceful with compatible tankmates in established tanks. These hardy fish are suitable for intermediate aquarists and add interesting behavioral displays.',
        imageUrl: null,
        tags: ["Intermediate","Semi-aggressive","Medium","Carnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'african-dwarf-frog',
        title: 'African Dwarf Frog',
        scientificName: 'Hymenochirus boettgeri',
        description: 'African Dwarf Frogs are tiny, peaceful amphibians displaying aquatic behavior and unique personality in planted tanks. They\'re carnivorous bottom-dwellers requiring groups of 2-3, soft substrate, and gentle tankmates. These fascinating creatures add diversity and interesting nocturnal behavior to established community tanks.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Medium","Carnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'albino-cory',
        title: 'Albino Cory',
        scientificName: 'Corydoras aeneus (albino)',
        description: 'Albino Corydoras are pale yellow variants displaying peaceful temperament and valuable cleanup behavior in community tanks. They require soft substrate for barbel health, groups of 6-12, and moderate water temperatures. These hardy, visible variants are excellent for monitoring water quality and substrate conditions.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'amano-shrimp',
        title: 'Amano Shrimp',
        scientificName: 'Caridina multidentata',
        description: 'Amano Shrimp are peaceful medium-sized fish growing to 2 inches. They should be kept in groups for best health and behavior. Amano Shrimp are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'apistogramma-agassizii',
        title: 'Apistogramma Agassizii',
        scientificName: 'Apistogramma agassizii',
        description: 'Apistogramma Agassizii are semi-aggressive medium-sized fish growing to 3.5 inches. They thrive when kept as specified in care guidelines. They require moderate care and are best suited for aquarists with some experience, feeding on carnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Semi-aggressive","Medium","Carnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'balloon-molly',
        title: 'Balloon Molly',
        scientificName: 'Poecilia sphenops (balloon morph)',
        description: 'Balloon Mollies are peaceful, hardy livebearers with balloon-shaped bodies derived from selective breeding of standard Mollies. They\'re versatile in brackish and freshwater tanks, though they prefer slightly higher pH and salinity for optimal health. These easy-care fish are excellent for beginners and community tanks.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'bamboo-shrimp',
        title: 'Bamboo Shrimp',
        scientificName: 'Atyopsis moluccensis',
        description: 'Bamboo Shrimp are large, peaceful filter-feeders displaying impressive coloring and gentle temperament in community tanks. They require strong water flow for feeding success and do well in groups, creating striking visual displays. These hardy freshwater shrimp are excellent for established tanks with stable conditions and adequate feeding.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'bandit-cory',
        title: 'Bandit Cory',
        scientificName: 'Corydoras metae',
        description: 'Bandit Cory are peaceful medium-sized fish growing to 2 inches. They should be kept in groups for best health and behavior. Bandit Cory are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'senegal-bichir',
        title: 'Bichir (Senegal)',
        scientificName: 'Polypterus senegalus',
        description: 'Bichir (Senegal) are semi-aggressive large fish that can grow up to 12 inches. They are best kept individually or with careful tankmate selection. They require moderate care and are best suited for aquarists with some experience, feeding on carnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Semi-aggressive","Large","Carnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'black-molly',
        title: 'Black Molly',
        scientificName: 'Poecilia sphenops (melanistic)',
        description: 'Black Mollies are melanistic variants of the Molly, displaying sleek black coloring from selective breeding. They\'re peaceful, hardy livebearers that do well in brackish or freshwater with neutral to slightly alkaline pH. These easy-care fish are prolific breeders and good community inhabitants for intermediate aquarists.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'black-neon-tetra',
        title: 'Black Neon Tetra',
        scientificName: 'Hyphessobrycon herbertaxelrodi',
        description: 'Black Neon Tetra are peaceful small fish reaching about 1.6 inches. They should be kept in groups for best health and behavior. Black Neon Tetra are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'black-phantom-tetra',
        title: 'Black Phantom Tetra',
        scientificName: 'Hyphessobrycon megalopterus',
        description: 'Black Phantom Tetras display deep black coloring with contrasting white dorsal fin tips and peaceful schooling behavior. They prefer soft, acidic water and planted tanks with subdued lighting that showcases their dramatic coloring. These hardy, attractive fish are excellent for intermediate aquarists creating peaceful community displays.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'black-ruby-barb',
        title: 'Black Ruby Barb',
        scientificName: 'Pethia nigrofasciata',
        description: 'Black Ruby Barb are peaceful medium-sized fish growing to 2.5 inches. They should be kept in groups for best health and behavior. Black Ruby Barb are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'black-skirt-tetra',
        title: 'Black Skirt Tetra',
        scientificName: 'Gymnocorymbus ternetzi',
        description: 'Black Skirt Tetra are peaceful medium-sized fish growing to 2.4 inches. They should be kept in groups for best health and behavior. Black Skirt Tetra are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'bloodfin-tetra',
        title: 'Bloodfin Tetra',
        scientificName: 'Aphyocharax anisitsi',
        description: 'Bloodfin Tetra are peaceful medium-sized fish growing to 2 inches. They should be kept in groups for best health and behavior. Bloodfin Tetra are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'blue-acara',
        title: 'Blue Acara',
        scientificName: 'Andinoacara pulcher',
        description: 'Blue Acara are semi-aggressive large fish that can grow up to 6 inches. They are best kept individually or with careful tankmate selection. Blue Acara are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Semi-aggressive","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'blue-gourami',
        title: 'Blue Gourami',
        scientificName: 'Trichopodus trichopterus',
        description: 'Blue Gourami are semi-aggressive large fish that can grow up to 6 inches. They are best kept individually or with careful tankmate selection. Blue Gourami are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Semi-aggressive","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'boesemans-rainbowfish',
        title: 'Boeseman\'s Rainbowfish',
        scientificName: 'Melanotaenia boesemani',
        description: 'Boeseman\'s Rainbowfish are peaceful medium-sized fish growing to 4.5 inches. They should be kept in groups for best health and behavior. Boeseman\'s Rainbowfish are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'bolivian-ram',
        title: 'Bolivian Ram',
        scientificName: 'Mikrogeophagus altispinosus',
        description: 'Bolivian Rams are peaceful dwarf cichlids with metallic gold coloring and striking pink and black markings. They\'re less aggressive than German Rams and do well in planted community tanks with soft substrate. These moderately hardy fish thrive in small groups and add peaceful activity to well-established tanks.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'brilliant-rasbora',
        title: 'Brilliant Rasbora',
        scientificName: 'Rasbora einthovenii',
        description: 'Brilliant Rasbora are peaceful medium-sized fish growing to 3.5 inches. They should be kept in groups for best health and behavior. They require moderate care and are best suited for aquarists with some experience, feeding on omnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'bristlenose-pleco',
        title: 'Bristlenose Pleco',
        scientificName: 'Ancistrus spp.',
        description: 'Bristlenose Pleco are peaceful medium-sized fish growing to 5 inches. They are best kept individually or with careful tankmate selection. Bristlenose Pleco are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'bronze-cory',
        title: 'Bronze Cory',
        scientificName: 'Corydoras aeneus',
        description: 'Bronze Cory are peaceful medium-sized fish growing to 2.75 inches. They should be kept in groups for best health and behavior. Bronze Cory are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'buenos-aires-tetra',
        title: 'Buenos Aires Tetra',
        scientificName: 'Hyphessobrycon anisitsi',
        description: 'Buenos Aires Tetra are semi-aggressive medium-sized fish growing to 3 inches. They should be kept in groups for best health and behavior. Buenos Aires Tetra are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Semi-aggressive","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'cardinal-tetra',
        title: 'Cardinal Tetra',
        scientificName: 'Paracheirodon axelrodi',
        description: 'Small peaceful tetra with striking iridescent blue stripe running nose to tail and bright red band below. Must be kept in schools of eight or more to show confidence and vibrant coloration. Sensitive to water chemistry changes, preferring slightly acidic water (75-80°F).',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'celestial-pearl-danio',
        title: 'Celestial Pearl Danio',
        scientificName: 'Danio margaritatus',
        description: 'Tiny peaceful nano fish with dark bodies scattered with golden spots and bright red-orange fins with black stripes. Males spar with rivals and court females; they prefer densely vegetated shallow waters. Recently discovered species from Southeast Asian hill streams.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'checker-barb',
        title: 'Checker Barb',
        scientificName: 'Oliotius oligolepis',
        description: 'Checker Barb are peaceful medium-sized fish growing to 2 inches. They should be kept in groups for best health and behavior. Checker Barb are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'cherry-barb',
        title: 'Cherry Barb',
        scientificName: 'Puntius titteya',
        description: 'Cherry Barb are peaceful medium-sized fish growing to 2 inches. They should be kept in groups for best health and behavior. Cherry Barb are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'cherry-shrimp',
        title: 'Cherry Shrimp',
        scientificName: 'Neocaridina davidi',
        description: 'Cherry Shrimp are peaceful small fish reaching about 1.5 inches. They thrive when kept as specified in care guidelines. Cherry Shrimp are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'chili-rasbora',
        title: 'Chili Rasbora',
        scientificName: 'Boraras brigittae',
        description: 'Chili Rasbora are peaceful small fish reaching about 0.8 inches. They should be kept in groups for best health and behavior. They require moderate care and are best suited for aquarists with some experience, feeding on omnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'chinese-algae-eater',
        title: 'Chinese Algae Eater',
        scientificName: 'Gyrinocheilus aymonieri',
        description: 'Chinese Algae Eaters are efficient algae consumers when young, but become aggressive and territorial as they mature. They\'re hardy and adaptable but may damage plants and harass peaceful fish despite their initial usefulness. These fish require careful monitoring and are best reserved for larger tanks with experienced aquarists.',
        imageUrl: null,
        tags: ["Intermediate","Semi-aggressive","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'chocolate-gourami',
        title: 'Chocolate Gourami',
        scientificName: 'Sphaerichthys osphromenoides',
        description: 'Chocolate Gouramis are shy, peaceful labyrinth fish displaying brown coloring with attractive stripe patterns. They require heavily planted tanks, warm water, and soft substrate to thrive, making them challenging for beginners. These fish are sensitive to water quality and do best in established tanks with gentle tankmates.',
        imageUrl: null,
        tags: ["Advanced","Peaceful","Schooling Fish","Medium","Carnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'clown-loach',
        title: 'Clown Loach',
        scientificName: 'Chromobotia macracanthus',
        description: 'Clown Loaches are large, colorful loaches with striking orange and black banding and playful, social behavior. They reach substantial sizes requiring large tanks and do best in groups, creating entertaining displays. These hardy fish are excellent centerpieces but require experienced care and long-term commitment.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'clown-pleco',
        title: 'Clown Pleco',
        scientificName: 'Panaqolus maccus',
        description: 'Clown Pleco are peaceful medium-sized fish growing to 4 inches. They are best kept individually or with careful tankmate selection. Clown Pleco are hardy and suitable for beginners with herbivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Medium","Herbivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'cockatoo-dwarf-cichlid',
        title: 'Cockatoo Dwarf Cichlid',
        scientificName: 'Apistogramma cacatuoides',
        description: 'Cockatoo Dwarf Cichlid are semi-aggressive medium-sized fish growing to 3.5 inches. They thrive when kept as specified in care guidelines. They require moderate care and are best suited for aquarists with some experience, feeding on omnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Semi-aggressive","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'common-pleco',
        title: 'Common Pleco',
        scientificName: 'Hypostomus plecostomus',
        description: 'Common Plecos are large suckermouth catfish growing to substantial sizes and displaying nocturnal, bottom-dwelling behavior. They\'re hardy and efficient algae eaters when young, but become less useful and more destructive as they grow. These fish require very large tanks and are best reserved for experienced aquarists.',
        imageUrl: null,
        tags: ["Intermediate","Semi-aggressive","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'congo-tetra',
        title: 'Congo Tetra',
        scientificName: 'Phenacogrammus interruptus',
        description: 'Congo Tetra are peaceful medium-sized fish growing to 3.5 inches. They should be kept in groups for best health and behavior. They require moderate care and are best suited for aquarists with some experience, feeding on omnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'convict-cichlid',
        title: 'Convict Cichlid',
        scientificName: 'Amatitlania nigrofasciata',
        description: 'Convict Cichlids are hardy, aggressive fish with striking black and white vertical stripe patterns and high breeding tendency. They\'re extremely hardy and adaptable but require careful tankmate selection due to aggressive behavior and spawning activity. These fish are excellent for experienced aquarists and educational purposes.',
        imageUrl: null,
        tags: ["Beginner Friendly","Aggressive","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'dalmatian-molly',
        title: 'Dalmatian Molly',
        scientificName: 'Poecilia sphenops (Dalmatian)',
        description: 'Dalmatian Molly are peaceful medium-sized fish growing to 4.5 inches. They should be kept in groups for best health and behavior. Dalmatian Molly are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'denison-barb',
        title: 'Denison Barb',
        scientificName: 'Sahyadria denisonii',
        description: 'Denison Barbs are large, impressive fish featuring striking red and black markings that make them highly sought after by aquarists. They require spacious tanks, good water movement, and thrive in groups of six or more. These fish are semi-aggressive and need careful tankmate selection due to their size and temperament.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'diamond-tetra',
        title: 'Diamond Tetra',
        scientificName: 'Moenkhausia pittieri',
        description: 'Diamond Tetra are peaceful medium-sized fish growing to 2.5 inches. They should be kept in groups for best health and behavior. Diamond Tetra are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'discus',
        title: 'Discus',
        scientificName: 'Symphysodon aequifasciatus',
        description: 'Discus fish are highly prized for their round, flattened body shape and intricate color patterns in various morphs. They\'re peaceful but require pristine water conditions, frequent water changes, and warm temperatures for optimal health. These challenging fish are best kept by experienced aquarists in larger tanks with compatible peaceful tankmates.',
        imageUrl: null,
        tags: ["Advanced","Peaceful","Schooling Fish","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'dojo-loach',
        title: 'Dojo Loach (Weather Loach)',
        scientificName: 'Misgurnus anguillicaudatus',
        description: 'Dojo Loach (Weather Loach) are peaceful large fish that can grow up to 12 inches. They should be kept in groups for best health and behavior. Dojo Loach (Weather Loach) are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'dwarf-chain-loach',
        title: 'Dwarf Chain Loach',
        scientificName: 'Ambastaia sidthimunki',
        description: 'Dwarf Chain Loaches are small, peaceful loaches displaying chain-like patterns and active schooling behavior. They require groups of 8-12, soft substrate, and plenty of hiding places to feel secure. These hardy fish are excellent for established community tanks and enjoy foraging in sand substrates.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'dwarf-gourami',
        title: 'Dwarf Gourami',
        scientificName: 'Trichogaster lalius',
        description: 'Dwarf Gourami are semi-aggressive medium-sized fish growing to 3.5 inches. They are best kept individually or with careful tankmate selection. Dwarf Gourami are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Semi-aggressive","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'dwarf-neon-rainbowfish',
        title: 'Dwarf Neon Rainbowfish',
        scientificName: 'Melanotaenia praecox',
        description: 'Dwarf Neon Rainbowfish are small, peaceful fish with subtle blue, red, and yellow coloring that become more vibrant under good lighting. They\'re perfect for nano and planted tanks, schooling peacefully in groups of 8-12. These hardy fish are excellent community inhabitants for intermediate aquarists seeking colorful, active swimmers.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'dwarf-petricola',
        title: 'Dwarf Petricola',
        scientificName: 'Synodontis petricola',
        description: 'Dwarf Petricola are peaceful medium-sized fish growing to 4 inches. They should be kept in groups for best health and behavior. They require moderate care and are best suited for aquarists with some experience, feeding on omnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'electric-blue-acara',
        title: 'Electric Blue Acara',
        scientificName: 'Andinoacara pulcher',
        description: 'Electric Blue Acaras are stunning cichlids displaying brilliant electric blue coloring throughout their bodies and fins. They\'re semi-aggressive and require larger tanks with plants and hiding spaces for territorial behavior. These moderately hardy fish are excellent for experienced aquarists seeking dramatic, colorful centerpieces.',
        imageUrl: null,
        tags: ["Intermediate","Semi-aggressive","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'elephant-nose-fish',
        title: 'Elephant Nose Fish',
        scientificName: 'Gnathonemus petersii',
        description: 'Elephant Nose Fish are peaceful large fish that can grow up to 9 inches. They are best kept individually or with careful tankmate selection. These fish require advanced care and are recommended for experienced aquarists only, with carnivore nutritional needs.',
        imageUrl: null,
        tags: ["Advanced","Peaceful","Large","Carnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'ember-tetra',
        title: 'Ember Tetra',
        scientificName: 'Hyphessobrycon amandae',
        description: 'Ember Tetra are peaceful small fish reaching about 0.8 inches. They should be kept in groups for best health and behavior. Ember Tetra are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'emerald-dwarf-rasbora',
        title: 'Emerald Dwarf Rasbora',
        scientificName: 'Danio erythromicron',
        description: 'Emerald Dwarf Rasbora are peaceful small fish reaching about 1 inches. They should be kept in groups for best health and behavior. They require moderate care and are best suited for aquarists with some experience, feeding on omnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'emperor-tetra',
        title: 'Emperor Tetra',
        scientificName: 'Nematobrycon palmeri',
        description: 'Emperor Tetras are striking fish displaying distinctive black markings and peaceful schooling behavior in groups of 8-12. They prefer planted tanks with subdued lighting that highlights their coloration and black-tipped dorsal fins. These hardy, beautiful fish are excellent for established community tanks with moderate care requirements.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'endlers-livebearer',
        title: 'Endler\'s Livebearer',
        scientificName: 'Poecilia wingei',
        description: 'Tiny peaceful livebearer with males displaying striking metallic patterns in green, orange, blue, and yellow. Active schooling fish where males constantly court females with elaborate displays. Very easy breeders producing live fry every 23-30 days in community tanks.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'exclamation-point-rasbora',
        title: 'Exclamation Point Rasbora',
        scientificName: 'Boraras urophthalmoides',
        description: 'Exclamation Point Rasboras are tiny, peaceful fish featuring dark bodies with a distinctive bright red spot and tail stripe resembling an exclamation mark. They thrive in densely planted nano tanks in groups of 10-15, creating dazzling visual effects. These fish are excellent for shrimp tanks and micro community setups with stable water conditions.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'firemouth-cichlid',
        title: 'Firemouth Cichlid',
        scientificName: 'Thorichthys meeki',
        description: 'Firemouth Cichlids are named for their vibrant red coloring on their mouths and throats, contrasted with blue gill covers. They\'re aggressive during breeding and territorial with other fish, but remain peaceful in established tanks with ample space. These hardy fish make excellent centerpieces for medium to large community tanks.',
        imageUrl: null,
        tags: ["Beginner Friendly","Semi-aggressive","Schooling Fish","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'five-banded-barb',
        title: 'Five-Banded Barb',
        scientificName: 'Desmopuntius pentazona',
        description: 'The Five-Banded Barb displays five distinctive dark vertical bands across its golden-yellow body, creating a beautiful striped pattern. These peaceful schooling fish are ideal for planted community tanks and do well in groups of 8-12 individuals. They prefer slightly acidic water and enjoy areas with dense vegetation for security.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'flame-tetra',
        title: 'Flame Tetra',
        scientificName: 'Hyphessobrycon flammeus',
        description: 'Flame Tetras display vibrant red coloring with contrasting black markings and peaceful schooling behavior in groups of 10-15. They prefer planted tanks with soft water and do well alongside other peaceful community fish. These hardy, colorful fish are excellent for intermediate aquarists seeking dramatic red-colored schooling displays.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'angelfish',
        title: 'Freshwater Angelfish',
        scientificName: 'Pterophyllum scalare',
        description: 'Freshwater Angelfish are semi-aggressive large fish that can grow up to 6 inches. They should be kept in groups for best health and behavior. They require moderate care and are best suited for aquarists with some experience, feeding on omnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Semi-aggressive","Schooling Fish","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'pea-puffer',
        title: 'Freshwater Pufferfish (Pea Puffer)',
        scientificName: 'Carinotetraodon travancoricus',
        description: 'Freshwater Pufferfish (Pea Puffer) are aggressive small fish reaching about 1 inches. They are best kept individually or with careful tankmate selection. They require moderate care and are best suited for aquarists with some experience, feeding on carnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Aggressive","Small","Carnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'german-blue-ram',
        title: 'German Blue Ram',
        scientificName: 'Mikrogeophagus ramirezi',
        description: 'German Blue Ram are peaceful medium-sized fish growing to 2.5 inches. They thrive when kept as specified in care guidelines. They require moderate care and are best suited for aquarists with some experience, feeding on omnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'ghost-shrimp',
        title: 'Ghost Shrimp',
        scientificName: 'Palaemonetes paludosus',
        description: 'Ghost Shrimp are peaceful medium-sized fish growing to 2 inches. They should be kept in groups for best health and behavior. Ghost Shrimp are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'glass-catfish',
        title: 'Glass Catfish',
        scientificName: 'Kryptopterus vitreolus',
        description: 'Glass Catfish are transparent fish featuring visible skeletons and internal organs, displaying ethereal, peaceful behavior. They\'re schooling fish that prefer groups of 6-8, stable water conditions, and soft substrate. These delicate-looking fish are sensitive to water quality and require gentle handling and acclimation.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Medium","Carnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'glowlight-tetra',
        title: 'Glowlight Tetra',
        scientificName: 'Hemigrammus erythrozonus',
        description: 'Glowlight Tetra are peaceful small fish reaching about 1.6 inches. They should be kept in groups for best health and behavior. Glowlight Tetra are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'gold-barb',
        title: 'Gold Barb',
        scientificName: 'Barbodes semifasciolatus',
        description: 'Gold Barb are peaceful medium-sized fish growing to 3 inches. They should be kept in groups for best health and behavior. Gold Barb are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'gold-gourami',
        title: 'Gold Gourami',
        scientificName: 'Trichopodus trichopterus (Gold)',
        description: 'Gold Gourami are semi-aggressive large fish that can grow up to 6 inches. They are best kept individually or with careful tankmate selection. Gold Gourami are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Semi-aggressive","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'gold-white-cloud',
        title: 'Gold White Cloud',
        scientificName: 'Tanichthys albonubes (Gold Morph)',
        description: 'Gold White Cloud are peaceful small fish reaching about 1.5 inches. They should be kept in groups for best health and behavior. Gold White Cloud are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'microrasbora',
        title: 'Green Kubotai Rasbora',
        scientificName: 'Microdevario kubotai',
        description: 'Green Kubotai Rasbora are peaceful small fish reaching about 0.75 inches. They should be kept in groups for best health and behavior. They require moderate care and are best suited for aquarists with some experience, feeding on omnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'green-neon-tetra',
        title: 'Green Neon Tetra',
        scientificName: 'Paracheirodon simulans',
        description: 'Green Neon Tetra are peaceful small fish reaching about 1 inches. They should be kept in groups for best health and behavior. They require moderate care and are best suited for aquarists with some experience, feeding on omnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'guppy',
        title: 'Guppy',
        scientificName: 'Poecilia reticulata',
        description: 'Colorful livebearer with males displaying vibrant flowing fins while females are larger and less colorful. Active and peaceful, they thrive in planted tanks with vegetation and prefer moderate warmth (72-82°F). Hardy with 2-3 year lifespan and suitable for beginners.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'harlequin-rasbora',
        title: 'Harlequin Rasbora',
        scientificName: 'Trigonostigma heteromorpha',
        description: 'Harlequin Rasbora are peaceful medium-sized fish growing to 2 inches. They should be kept in groups for best health and behavior. Harlequin Rasbora are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'hillstream-loach',
        title: 'Hillstream Loach',
        scientificName: 'Sewellia lineolata',
        description: 'Hillstream Loaches have flattened bodies adapted to fast-flowing waters, featuring beautiful markings and peaceful temperaments. They require high water flow, strong aeration, and cool temperatures, thriving in specialized hillstream setups. These unique fish are excellent for experienced aquarists with appropriate tank conditions.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'honey-gourami',
        title: 'Honey Gourami',
        scientificName: 'Trichogaster chuna',
        description: 'Honey Gourami are peaceful medium-sized fish growing to 2.2 inches. They should be kept in groups for best health and behavior. Honey Gourami are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'jack-dempsey',
        title: 'Jack Dempsey',
        scientificName: 'Rocio octofasciata',
        description: 'Jack Dempsey are aggressive large fish that can grow up to 10 inches. They are best kept individually or with careful tankmate selection. They require moderate care and are best suited for aquarists with some experience, feeding on carnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Aggressive","Large","Carnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'jewel-cichlid',
        title: 'Jewel Cichlid',
        scientificName: 'Hemichromis bimaculatus',
        description: 'Jewel Cichlid are aggressive large fish that can grow up to 6 inches. They thrive when kept as specified in care guidelines. Jewel Cichlid are hardy and suitable for beginners with carnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Aggressive","Large","Carnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'julii-cory',
        title: 'Julii Cory',
        scientificName: 'Corydoras julii',
        description: 'Julii Corydoras feature intricate spotting patterns and peaceful, active foraging behavior along tank substrates. They require soft substrate, groups of 6 or more, and appreciate gentle water flow. These hardy fish are excellent for established community tanks and help maintain clean, healthy substrates.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'keyhole-cichlid',
        title: 'Keyhole Cichlid',
        scientificName: 'Cleithracara maronii',
        description: 'Keyhole Cichlid are peaceful medium-sized fish growing to 5 inches. They are best kept individually or with careful tankmate selection. Keyhole Cichlid are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'kissing-gourami',
        title: 'Kissing Gourami',
        scientificName: 'Helostoma temminckii',
        description: 'Kissing Gourami are semi-aggressive large fish that can grow up to 12 inches. They are best kept individually or with careful tankmate selection. Kissing Gourami are hardy and suitable for beginners with herbivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Semi-aggressive","Large","Herbivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'kribensis',
        title: 'Kribensis',
        scientificName: 'Pelvicachromis pulcher',
        description: 'Kribensis are stunning small cichlids featuring red bellies and colorful body patterns, with distinct gender dimorphism. They\'re semi-aggressive and pairs should be kept together in planted tanks with caves for breeding. These hardy fish are good for intermediate aquarists and add interesting breeding behavior to established tanks.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'kuhli-loach',
        title: 'Kuhli Loach',
        scientificName: 'Pangio kuhlii',
        description: 'Kuhli Loach are peaceful medium-sized fish growing to 4 inches. They should be kept in groups for best health and behavior. Kuhli Loach are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'lambchop-rasbora',
        title: 'Lambchop Rasbora',
        scientificName: 'Trigonostigma espei',
        description: 'Lambchop Rasbora are peaceful small fish reaching about 1.5 inches. They should be kept in groups for best health and behavior. Lambchop Rasbora are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'least-killifish',
        title: 'Least Killifish',
        scientificName: 'Heterandria formosa',
        description: 'Least Killifish are the smallest livebearing fish, with adults measuring just one inch long, making them ideal for nano tanks. These peaceful, colorful fish prefer densely planted setups and do well in small groups or pairs. They\'re hardy and excellent for shrimp tanks, though they require stable conditions and quality food.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'lemon-tetra',
        title: 'Lemon Tetra',
        scientificName: 'Hyphessobrycon pulchripinnis',
        description: 'Lemon Tetra are peaceful medium-sized fish growing to 2 inches. They should be kept in groups for best health and behavior. Lemon Tetra are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'molly',
        title: 'Molly',
        scientificName: 'Poecilia sphenops',
        description: 'Colorful livebearer with flattened body and varied fin shapes, available in 8+ color morphs from black to red. Active and sociable but best kept mostly female to prevent harassment. Hardy and prefer warm tropical water (75-82°F) with dense vegetation.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'moonlight-gourami',
        title: 'Moonlight Gourami',
        scientificName: 'Trichopodus microlepis',
        description: 'Moonlight Gourami are peaceful large fish that can grow up to 6 inches. They are best kept individually or with careful tankmate selection. Moonlight Gourami are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'mosquitofish',
        title: 'Mosquitofish',
        scientificName: 'Gambusia affinis',
        description: 'Mosquitofish are semi-aggressive medium-sized fish growing to 2.5 inches. They should be kept in groups for best health and behavior. Mosquitofish are hardy and suitable for beginners with carnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Semi-aggressive","Schooling Fish","Medium","Carnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'mystery-snail',
        title: 'Mystery Snail',
        scientificName: 'Pomacea bridgesii',
        description: 'Mystery Snail are peaceful medium-sized fish growing to 2.5 inches. They are best kept individually or with careful tankmate selection. Mystery Snail are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'nerite-snail',
        title: 'Nerite Snail',
        scientificName: 'Neritina spp.',
        description: 'Nerite Snail are peaceful small fish reaching about 1 inches. They are best kept individually or with careful tankmate selection. Nerite Snail are hardy and suitable for beginners with herbivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Small","Herbivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'odessa-barb',
        title: 'Odessa Barb',
        scientificName: 'Pethia padamya',
        description: 'The Odessa Barb is a stunning barb with vibrant red coloring and dark stripes, making it one of the most visually striking barbs available. These active swimmers prefer to school with others and do well in planted tanks with moderate water flow. They\'re generally hardy and good for intermediate aquarists.',
        imageUrl: null,
        tags: ["Beginner Friendly","Semi-aggressive","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'opaline-gourami',
        title: 'Opaline Gourami',
        scientificName: 'Trichopodus trichopterus',
        description: 'Opaline Gourami are semi-aggressive large fish that can grow up to 6 inches. They are best kept individually or with careful tankmate selection. Opaline Gourami are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Semi-aggressive","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'oscar',
        title: 'Oscar',
        scientificName: 'Astronotus ocellatus',
        description: 'Oscar are aggressive large fish that can grow up to 12 inches. They are best kept individually or with careful tankmate selection. They require moderate care and are best suited for aquarists with some experience, feeding on carnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Aggressive","Large","Carnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'otocinclus',
        title: 'Otocinclus Catfish',
        scientificName: 'Otocinclus spp.',
        description: 'Otocinclus Catfish are peaceful medium-sized fish growing to 2 inches. They should be kept in groups for best health and behavior. They require moderate care and are best suited for aquarists with some experience, feeding on herbivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Medium","Herbivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'panda-cory',
        title: 'Panda Cory',
        scientificName: 'Corydoras panda',
        description: 'Panda Cory are peaceful medium-sized fish growing to 2 inches. They should be kept in groups for best health and behavior. They require moderate care and are best suited for aquarists with some experience, feeding on omnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'paradise-fish',
        title: 'Paradise Fish',
        scientificName: 'Macropodus opercularis',
        description: 'Paradise Fish are beautiful labyrinth fish with vibrant red and blue coloring, but display aggressive territorial behavior toward other males. They\'re hardy and adaptable to various conditions, thriving in planted tanks with cover. These fish are excellent for experienced aquarists seeking single-specimen displays in smaller tanks.',
        imageUrl: null,
        tags: ["Beginner Friendly","Aggressive","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'betta-imbellis',
        title: 'Peaceful Betta',
        scientificName: 'Betta imbellis',
        description: 'Peaceful Betta are peaceful medium-sized fish growing to 2.5 inches. They thrive when kept as specified in care guidelines. They require moderate care and are best suited for aquarists with some experience, feeding on carnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Medium","Carnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'peacock-cichlid',
        title: 'Peacock Cichlid',
        scientificName: 'Aulonocara species',
        description: 'Peacock Cichlid are semi-aggressive large fish that can grow up to 6 inches. They thrive when kept as specified in care guidelines. They require moderate care and are best suited for aquarists with some experience, feeding on carnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Semi-aggressive","Large","Carnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'pearl-danio',
        title: 'Pearl Danio',
        scientificName: 'Danio albolineatus',
        description: 'Iridescent purple-bodied fish with striking orange lateral stripe and neon eyes, growing 2.4-2.8 inches. Active shoaling species that prefer cooler tropical temperatures and thrive in groups of six or more. Hardy and adaptable to various conditions (73-77°F).',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'pearl-gourami',
        title: 'Pearl Gourami',
        scientificName: 'Trichopodus leerii',
        description: 'Pearl Gourami are peaceful medium-sized fish growing to 4.8 inches. They should be kept in groups for best health and behavior. Pearl Gourami are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'penguin-tetra',
        title: 'Penguin Tetra',
        scientificName: 'Thayeria boehlkei',
        description: 'Penguin Tetra are peaceful medium-sized fish growing to 3 inches. They should be kept in groups for best health and behavior. Penguin Tetra are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'pentazona-barb',
        title: 'Pentazona Barb',
        scientificName: 'Desmopuntius pentazona',
        description: 'Pentazona Barb are peaceful medium-sized fish growing to 2 inches. They should be kept in groups for best health and behavior. They require moderate care and are best suited for aquarists with some experience, feeding on omnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'peppered-cory',
        title: 'Peppered Cory',
        scientificName: 'Corydoras paleatus',
        description: 'Peppered Corydoras are peaceful bottom-dwellers with spotted gray coloring, playing crucial cleanup roles in established tanks. They require soft substrate for foraging, require groups of 6 or more, and prefer cool to moderate water temperatures. These hardy fish are excellent for planted community tanks and help maintain substrate health.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'phoenix-rasbora',
        title: 'Phoenix Rasbora',
        scientificName: 'Boraras merah',
        description: 'Phoenix Rasbora are peaceful small fish reaching about 0.75 inches. They should be kept in groups for best health and behavior. They require moderate care and are best suited for aquarists with some experience, feeding on omnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'pictus-catfish',
        title: 'Pictus Catfish',
        scientificName: 'Pimelodus pictus',
        description: 'Pictus Catfish are peaceful medium-sized fish growing to 5 inches. They should be kept in groups for best health and behavior. They require moderate care and are best suited for aquarists with some experience, feeding on carnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Medium","Carnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'platy',
        title: 'Platy',
        scientificName: 'Xiphophorus maculatus',
        description: 'Small peaceful livebearer available in 130+ color variations including Mickey Mouse and sunburst patterns. Males smaller with pointed anal fins; females rounder and larger. Very hardy and undemanding, thriving in community tanks with 3-4 year lifespan (72-82°F).',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'pristella-tetra',
        title: 'Pristella Tetra',
        scientificName: 'Pristella maxillaris',
        description: 'Pristella Tetras feature black and white striped dorsal and anal fins creating elegant, distinctive patterns. They\'re peaceful schooling fish thriving in groups of 8-12 in planted community tanks. These hardy, visually interesting fish are excellent for established tanks and pair well with other peaceful community species.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'pygmy-cory',
        title: 'Pygmy Cory',
        scientificName: 'Corydoras pygmaeus',
        description: 'Pygmy Cory are peaceful small fish reaching about 1 inches. They should be kept in groups for best health and behavior. Pygmy Cory are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'rainbow-shark',
        title: 'Rainbow Shark',
        scientificName: 'Epalzeorhynchos frenatum',
        description: 'Rainbow Shark are semi-aggressive large fish that can grow up to 6 inches. They are best kept individually or with careful tankmate selection. They require moderate care and are best suited for aquarists with some experience, feeding on omnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Semi-aggressive","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'ramshorn-snail',
        title: 'Ramshorn Snail',
        scientificName: 'Planorbidae family',
        description: 'Ramshorn Snails are colorful, peaceful gastropods displaying spiral shells in various colors from red to brown. They\'re excellent algae eaters, reproduce readily in warm conditions, and require calcium for healthy shell development. These hardy snails are beneficial additions to most aquariums, though population control may be necessary.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'red-phantom-tetra',
        title: 'Red Phantom Tetra',
        scientificName: 'Hyphessobrycon sweglesi',
        description: 'Red Phantom Tetra are peaceful small fish reaching about 1.5 inches. They should be kept in groups for best health and behavior. They require moderate care and are best suited for aquarists with some experience, feeding on omnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'red-rainbowfish',
        title: 'Red Rainbowfish',
        scientificName: 'Glossolepis incisus',
        description: 'Red Rainbowfish are vibrant fish featuring brilliant red-orange coloring throughout their bodies, with intensely colored dorsal and anal fins. These peaceful schoolers thrive in groups and prefer tanks with plenty of swimming space and moderate water flow. They do well in planted tanks and are relatively hardy for experienced aquarists.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'rope-fish',
        title: 'Rope Fish',
        scientificName: 'Erpetoichthys calabaricus',
        description: 'Rope Fish are peaceful large fish that can grow up to 15 inches. They are best kept individually or with careful tankmate selection. They require moderate care and are best suited for aquarists with some experience, feeding on carnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Large","Carnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'rosy-barb',
        title: 'Rosy Barb',
        scientificName: 'Pethia conchonius',
        description: 'Rosy Barb are peaceful medium-sized fish growing to 4 inches. They should be kept in groups for best health and behavior. Rosy Barb are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'rubber-lip-pleco',
        title: 'Rubber Lip Pleco',
        scientificName: 'Chaetostoma milesi',
        description: 'Rubber Lip Plecos are smaller alternatives to Common Plecos, featuring distinctive thick lips and peaceful behavior. They\'re effective algae eaters, nocturnal foragers, and remain manageable in larger community tanks throughout their lives. These hardy, helpful fish are excellent additions to established tanks with moderate to large sizes.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Large","Herbivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'rummy-nose-tetra',
        title: 'Rummy Nose Tetra',
        scientificName: 'Hemigrammus rhodostomus',
        description: 'Rummy Nose Tetra are peaceful medium-sized fish growing to 2.5 inches. They should be kept in groups for best health and behavior. They require moderate care and are best suited for aquarists with some experience, feeding on omnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'sailfin-molly',
        title: 'Sailfin Molly',
        scientificName: 'Poecilia velifera',
        description: 'Sailfin Molly are peaceful large fish that can grow up to 6 inches. They should be kept in groups for best health and behavior. They require moderate care and are best suited for aquarists with some experience, feeding on herbivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Large","Herbivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'salt-and-pepper-cory',
        title: 'Salt and Pepper Cory',
        scientificName: 'Corydoras habrosus',
        description: 'Salt and Pepper Corydoras are small, peaceful fish with spotted gray coloring, thriving in groups of 6-12 in soft substrate. They actively forage, helping maintain substrate health and cleanliness in established tanks. These hardy, easy-care fish are perfect for planted community tanks and nano setups.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'scissortail-rasbora',
        title: 'Scissortail Rasbora',
        scientificName: 'Rasbora trilineata',
        description: 'Scissortail Rasbora are peaceful large fish that can grow up to 6 inches. They should be kept in groups for best health and behavior. Scissortail Rasbora are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'serpae-tetra',
        title: 'Serpae Tetra',
        scientificName: 'Hyphessobrycon eques',
        description: 'Serpae Tetra are semi-aggressive small fish reaching about 1.75 inches. They should be kept in groups for best health and behavior. Serpae Tetra are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Semi-aggressive","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'severum',
        title: 'Severum',
        scientificName: 'Heros severus',
        description: 'Severum are semi-aggressive large fish that can grow up to 8 inches. They are best kept individually or with careful tankmate selection. They require moderate care and are best suited for aquarists with some experience, feeding on omnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Semi-aggressive","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'siamese-algae-eater',
        title: 'Siamese Algae Eater',
        scientificName: 'Crossocheilus oblongus',
        description: 'Siamese Algae Eater are peaceful large fish that can grow up to 6 inches. They should be kept in groups for best health and behavior. Siamese Algae Eater are hardy and suitable for beginners with herbivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Large","Herbivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'silver-dollar',
        title: 'Silver Dollar',
        scientificName: 'Metynnis argenteus',
        description: 'Silver Dollar are peaceful large fish that can grow up to 6 inches. They should be kept in groups for best health and behavior. They require moderate care and are best suited for aquarists with some experience, feeding on herbivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Large","Herbivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'singapore-shrimp',
        title: 'Singapore Shrimp',
        scientificName: 'Macrobrachium lanchesteri',
        description: 'Singapore Shrimp are small, peaceful creatures displaying subtle coloring and excellent cleanup behavior in community tanks. They require stable water conditions and do well in groups, contributing to overall tank cleanliness. These hardy freshwater shrimp are perfect for planted tanks and aquascapes with fine substrates.',
        imageUrl: null,
        tags: ["Intermediate","Semi-aggressive","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'sparkling-gourami',
        title: 'Sparkling Gourami',
        scientificName: 'Trichopsis pumila',
        description: 'Sparkling Gourami are peaceful small fish reaching about 1.6 inches. They should be kept in groups for best health and behavior. They require moderate care and are best suited for aquarists with some experience, feeding on omnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'sterbai-cory',
        title: 'Sterbai Cory',
        scientificName: 'Corydoras sterbai',
        description: 'Sterbai Corydoras display vibrant orange spots and stripes with peaceful, industrious behavior that benefits tank substrate. They prefer soft substrate, moderate warmth, and groups of 6-12 for optimal social behavior. These hardy, colorful fish are excellent for planted community tanks and establish well in various setups.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'strawberry-rasbora',
        title: 'Strawberry Rasbora',
        scientificName: 'Boraras naevus',
        description: 'Strawberry Rasbora are peaceful small fish reaching about 0.75 inches. They should be kept in groups for best health and behavior. They require moderate care and are best suited for aquarists with some experience, feeding on omnivore diets.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'striped-raphael-catfish',
        title: 'Striped Raphael Catfish',
        scientificName: 'Platydoras armatulus',
        description: 'Striped Raphael Catfish are nocturnal, armored catfish with striped patterns and peaceful temperament despite their intimidating appearance. They\'re hardy, hide during the day in caves, and emerge at night to forage. These interesting fish are excellent for establishing nighttime activity and adding diversity to mature tanks.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'swordtail',
        title: 'Swordtail',
        scientificName: 'Xiphophorus hellerii',
        description: 'Named for males\' distinctive elongated lower tail lobe resembling a sword, available in 50+ color morphs. Peaceful and active swimmers preferring heavily vegetated environments. Hardy adaptable livebearers with 3-5 year lifespan, best with 2+ females per male.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'threadfin-rainbowfish',
        title: 'Threadfin Rainbowfish',
        scientificName: 'Iriatherina werneri',
        description: 'Threadfin Rainbowfish are delicate, peaceful fish with slender bodies and elegant thread-like fin extensions. They\'re ideal for planted nano tanks, schooling in groups of 6-8, and prefer soft, slightly acidic water. These gentle fish are sensitive to water quality changes and require careful acclimation and stable tank conditions.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'three-spot-gourami',
        title: 'Three Spot Gourami',
        scientificName: 'Trichopodus trichopterus',
        description: 'Three Spot Gouramis are labyrinth fish featuring blue coloring with three dark spots and aggressive territorial behavior toward other males. They\'re hardy and adaptable, doing well in planted tanks with subdued lighting and plenty of hiding spaces. Males are highly territorial; females are more peaceful and suitable for community settings.',
        imageUrl: null,
        tags: ["Beginner Friendly","Semi-aggressive","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'ticto-barb',
        title: 'Ticto Barb',
        scientificName: 'Pethia ticto',
        description: 'Ticto Barb are peaceful medium-sized fish growing to 4 inches. They should be kept in groups for best health and behavior. Ticto Barb are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'tiger-barb',
        title: 'Tiger Barb',
        scientificName: 'Puntigrus tetrazona',
        description: 'Tiger Barb are semi-aggressive medium-sized fish growing to 3 inches. They should be kept in groups for best health and behavior. Tiger Barb are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Semi-aggressive","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'turquoise-rainbowfish',
        title: 'Turquoise Rainbowfish',
        scientificName: 'Melanotaenia lacustris',
        description: 'Turquoise Rainbowfish display stunning turquoise-blue coloring with yellow-orange accents, becoming more intense with age and proper care. They\'re peaceful, active schooling fish that prefer larger tanks with good water movement and stable parameters. These fish are moderately hardy and create impressive visual displays in mature aquascapes.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'twig-catfish',
        title: 'Twig Catfish',
        scientificName: 'Farlowella acus',
        description: 'Twig Catfish are peaceful large fish that can grow up to 8 inches. They are best kept individually or with careful tankmate selection. These fish require advanced care and are recommended for experienced aquarists only, with herbivore nutritional needs.',
        imageUrl: null,
        tags: ["Advanced","Peaceful","Large","Herbivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'upside-down-catfish',
        title: 'Upside-Down Catfish',
        scientificName: 'Synodontis nigriventris',
        description: 'Upside-Down Catfish display unique behavior of swimming upside-down, featuring spotted patterns and peaceful temperament. They\'re nocturnal bottom-dwellers preferring caves, dim lighting, and stable water parameters. These hardy, entertaining fish add behavioral interest and nocturnal activity to established community tanks.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'variatus-platy',
        title: 'Variatus Platy',
        scientificName: 'Xiphophorus variatus',
        description: 'Variatus Platies are colorful, hardy livebearers featuring variable coloration including yellow, red, and blue patterns. They\'re peaceful, easy to care for, and produce readily in community tanks, making them excellent for beginners. These adaptable fish do well in various water conditions and are perfect starter fish.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'white-cloud-minnow',
        title: 'White Cloud Mountain Minnow',
        scientificName: 'Tanichthys albonubes',
        description: 'White Cloud Mountain Minnow are peaceful small fish reaching about 1.5 inches. They should be kept in groups for best health and behavior. White Cloud Mountain Minnow are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Small","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'x-ray-tetra',
        title: 'X-Ray Tetra',
        scientificName: 'Pristella maxillaris',
        description: 'X-Ray Tetra are peaceful medium-sized fish growing to 2 inches. They should be kept in groups for best health and behavior. X-Ray Tetra are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'yellow-lab-cichlid',
        title: 'Yellow Lab Cichlid',
        scientificName: 'Labidochromis caeruleus',
        description: 'Yellow Lab Cichlid are semi-aggressive medium-sized fish growing to 5 inches. They thrive when kept as specified in care guidelines. Yellow Lab Cichlid are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Semi-aggressive","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'yoyo-loach',
        title: 'Yoyo Loach',
        scientificName: 'Botia almorhae',
        description: 'Yoyo Loaches are active, playful bottom-dwellers featuring spotted patterns resembling Y-O-Y-O markings on their bodies. They\'re semi-aggressive and may harass smaller fish or each other, requiring careful group management. These hardy, entertaining fish do well in larger tanks with caves and hiding spaces.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Large","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'zebra-danio',
        title: 'Zebra Danio',
        scientificName: 'Danio rerio',
        description: 'Zebra Danio are peaceful medium-sized fish growing to 2 inches. They should be kept in groups for best health and behavior. Zebra Danio are hardy and suitable for beginners with omnivore diets.',
        imageUrl: null,
        tags: ["Beginner Friendly","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    },

    {
        id: 'zebra-loach',
        title: 'Zebra Loach',
        scientificName: 'Botia striata',
        description: 'Zebra Loaches feature distinctive horizontal stripes and peaceful, schooling behavior in groups of 6-8 or more. They prefer soft substrate, caves, and dim lighting, becoming active during dawn and dusk hours. These hardy fish are excellent for larger community tanks and display interesting social hierarchies.',
        imageUrl: null,
        tags: ["Intermediate","Peaceful","Schooling Fish","Medium","Omnivore"],
        category: 'species',
        author: 'System',
        created: new Date().toISOString(),
        firestoreId: null,
        userId: null,
        upvotes: 0,
        verified: true
    }

// ============================================================================
// SUMMARY
// Total entries generated: 140
// Using researched descriptions: 54
// Using generated descriptions: 86
// ============================================================================

            ],
            diseases: [
                {
                    id: 'ich',
                    title: 'Ich (White Spot Disease)',
                    scientificName: 'Ichthyophthirius multifiliis',
                    description: 'A common parasitic disease that appears as white spots on fish bodies and fins. Caused by stress, poor water quality, or temperature fluctuations. Highly contagious but treatable with medication and temperature increase.',
                    imageUrl: null,
                    tags: ['Parasitic', 'Contagious', 'Treatable', 'Common'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },
                {
                    id: 'fin-rot',
                    title: 'Fin Rot',
                    scientificName: 'Various bacterial infections',
                    description: 'Bacterial infection causing fins to appear ragged, torn, or discolored. Often starts at the edges and progresses inward. Caused by poor water quality, stress, or injury. Treat with antibacterial medication and water changes.',
                    imageUrl: null,
                    tags: ['Bacterial', 'Water Quality', 'Treatable', 'Common'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },
                {
                    id: 'dropsy',
                    title: 'Dropsy',
                    scientificName: 'Various bacterial infections',
                    description: 'Serious condition where fish appear swollen with protruding scales (pinecone appearance). Usually caused by internal bacterial infection. Difficult to treat; often requires antibiotics and salt baths. Quarantine affected fish immediately.',
                    imageUrl: null,
                    tags: ['Bacterial', 'Serious', 'Difficult to Treat', 'Quarantine'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'columnaris',
                    title: 'Columnaris (Cotton Mouth Disease)',
                    scientificName: 'Flavobacterium columnare',
                    description: 'Bacterial infection appearing as white/gray cottony growths on mouth, fins, and body. Often mistaken for fungus. Symptoms include frayed fins, skin ulcerations, gill necrosis, lethargy, and loss of appetite. Caused by poor water quality, stress, overcrowding, and injury. Treatment involves antibacterial medications (kanamycin, nitrofurazone), improved water quality, salt baths (for scale fish), and quarantine of infected fish. Highly contagious and can be fatal if untreated.',
                    imageUrl: null,
                    tags: ['Bacterial', 'Contagious', 'Serious', 'Treatable', 'Water Quality'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'popeye',
                    title: 'Popeye (Exophthalmia)',
                    scientificName: 'Various bacterial infections',
                    description: 'Swelling and protrusion of one or both eyes caused by fluid buildup behind the eye. Unilateral (one eye) cases usually result from injury or localized infection. Bilateral (both eyes) indicates systemic infection or poor water quality. Symptoms include bulging eyes, cloudy eyes, loss of vision, and lethargy. Caused by poor water quality, bacterial infection, internal parasites, or tuberculosis. Treatment includes water changes, antibacterial medications, Epsom salt baths (1-3 tsp/gallon), and addressing underlying causes. Prognosis is good if treated early.',
                    imageUrl: null,
                    tags: ['Bacterial', 'Water Quality', 'Treatable', 'Symptom'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'mouth-fungus',
                    title: 'Mouth Fungus',
                    scientificName: 'Flavobacterium columnare',
                    description: 'Despite its name, this is a bacterial infection (same as columnaris), not a fungal disease. Appears as white/gray cottony growth around mouth and lips. Symptoms include mouth rot, difficulty eating, white patches, fin deterioration, and behavioral changes. Caused by poor water quality, stress, injuries to mouth area, and weakened immune system. Treatment involves antibacterial medications (kanamycin, tetracycline), improved water conditions, salt baths for scale fish, and isolation of infected fish. Can rapidly spread in community tanks.',
                    imageUrl: null,
                    tags: ['Bacterial', 'Contagious', 'Common', 'Treatable', 'Misidentified'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'fish-tuberculosis',
                    title: 'Tuberculosis (Fish TB/Mycobacteriosis)',
                    scientificName: 'Mycobacterium marinum, M. fortuitum',
                    description: 'Chronic bacterial infection that is difficult to diagnose and treat. Symptoms include wasting despite eating, lethargy, skin lesions, loss of color, skeletal deformities, fin/tail rot, and popeye. Often progresses slowly over months. Caused by Mycobacterium bacteria present in contaminated water, substrate, or infected fish. Highly resistant to treatment; most cases are incurable. Prevention through quarantine and good hygiene is critical. ZOONOTIC WARNING: Can infect humans through open wounds (fish handler\'s disease). Wear gloves when maintaining tanks with suspected cases.',
                    imageUrl: null,
                    tags: ['Bacterial', 'Chronic', 'Difficult to Treat', 'Zoonotic', 'Fatal'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'hemorrhagic-septicemia',
                    title: 'Hemorrhagic Septicemia',
                    scientificName: 'Aeromonas, Pseudomonas, Vibrio species',
                    description: 'Acute bacterial infection causing internal and external bleeding. Symptoms include red streaks in fins and body, bloody patches, bulging eyes, bloating, lethargy, rapid breathing, and sudden death. Fish may have red/bloody eyes and lesions. Caused by poor water quality, stress, overcrowding, and compromised immune systems. Highly contagious. Treatment requires immediate antibiotic therapy (chloramphenicol, tetracycline), aggressive water changes, removal of infected fish, and improved husbandry. Can cause rapid die-offs if not addressed quickly.',
                    imageUrl: null,
                    tags: ['Bacterial', 'Serious', 'Contagious', 'Treatable', 'Acute'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'ulcer-disease',
                    title: 'Ulcer Disease',
                    scientificName: 'Aeromonas salmonicida, A. hydrophila',
                    description: 'Bacterial infection causing open sores and ulcers on the body. Symptoms include red, open wounds, raised scales around lesions, lethargy, loss of appetite, and secondary fungal infections. Ulcers typically start as red spots that develop into deep, crater-like wounds. Caused by Aeromonas bacteria entering through injuries, poor water quality, and stress. Treatment involves antibacterial medications (kanamycin, enrofloxacin), topical treatments for accessible ulcers, improved water quality, and salt baths. Severe cases may require veterinary care. Secondary infections are common.',
                    imageUrl: null,
                    tags: ['Bacterial', 'External', 'Treatable', 'Water Quality', 'Serious'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'velvet-disease',
                    title: 'Velvet Disease (Oodinium)',
                    scientificName: 'Oodinium pillularis',
                    description: 'Parasitic infection causing a golden or rust-colored dust-like coating on fish. Appears as a velvety sheen under light. Symptoms include scratching against objects, clamped fins, rapid breathing, lethargy, loss of appetite, and peeling skin. More deadly than ich if untreated. Caused by Oodinium dinoflagellate parasites. Treatment involves copper-based medications, raising temperature to 82-85°F, darkening the tank (parasites need light), salt baths, and quarantine. Remove carbon from filters during treatment. Highly contagious; treat entire tank.',
                    imageUrl: null,
                    tags: ['Parasitic', 'Contagious', 'Common', 'Treatable', 'Gold Dust'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'anchor-worms',
                    title: 'Anchor Worms',
                    scientificName: 'Lernaea species',
                    description: 'Crustacean parasites that burrow into fish skin, appearing as white/green thread-like worms (3-20mm) protruding from the body. Anchor their heads deep into muscle tissue. Symptoms include visible worms, red inflammation at attachment sites, scratching, lethargy, and secondary bacterial infections. More common in ponds but can occur in aquariums. Treatment involves manual removal with tweezers (followed by antiseptic), antiparasitic medications (potassium permanganate, organophosphates), and treating tank to kill free-swimming larvae. Multiple treatments needed to break lifecycle (2-3 weeks apart).',
                    imageUrl: null,
                    tags: ['Parasitic', 'External', 'Visible', 'Treatable', 'Crustacean'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'fish-lice',
                    title: 'Fish Lice',
                    scientificName: 'Argulus species',
                    description: 'Disc-shaped crustacean parasites (3-10mm) visible to the naked eye, appearing as translucent/green spots on fish. Use suckers to attach and feed on blood. Symptoms include visible lice, scratching, jumping, red inflammation, lethargy, flashing, and secondary infections. Can move between fish. Common in pond fish but can affect aquarium fish. Treatment involves manual removal, antiparasitic medications (potassium permanganate, organophosphates, salt dips), and treating water to kill eggs and juveniles. Quarantine new fish for 2-3 weeks.',
                    imageUrl: null,
                    tags: ['Parasitic', 'External', 'Visible', 'Treatable', 'Crustacean'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'gill-flukes',
                    title: 'Gill Flukes',
                    scientificName: 'Dactylogyrus species',
                    description: 'Microscopic flatworm parasites infesting gills, causing respiratory distress. Symptoms include rapid gill movement, gasping at surface, one or both gill covers held open, mucus production, pale gills, lethargy, and weight loss. Fish may scratch gills against objects. Heavy infestations can be fatal. Caused by Dactylogyrus flukes introduced via contaminated fish, plants, or equipment. Diagnosis requires microscopic examination of gill scraping. Treatment involves antiparasitic medications (praziquantel, formalin), salt baths (for scale fish), improved water quality and oxygenation. May require multiple treatments.',
                    imageUrl: null,
                    tags: ['Parasitic', 'Internal', 'Serious', 'Treatable', 'Microscopic'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'skin-flukes',
                    title: 'Skin Flukes',
                    scientificName: 'Gyrodactylus species',
                    description: 'Microscopic flatworm parasites attaching to skin, fins, and gills. Unlike gill flukes, Gyrodactylus gives live birth and can reproduce without a host. Symptoms include excessive slime coat, cloudy skin, scratching/flashing, torn fins, lethargy, and respiratory distress if gills are affected. Infected areas may appear gray or have a velvety appearance. Highly contagious. Caused by introduction via new fish, plants, or contaminated equipment. Treatment includes antiparasitic medications (praziquantel, formalin, salt baths for 5-30 minutes), and treating entire tank. Can be resistant to treatment; multiple rounds may be needed.',
                    imageUrl: null,
                    tags: ['Parasitic', 'External', 'Microscopic', 'Treatable', 'Contagious'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'camallanus-worms',
                    title: 'Camallanus Worms',
                    scientificName: 'Camallanus species',
                    description: 'Internal roundworm parasites living in the intestines. Red/orange worms (2-20mm) may protrude from anus. Symptoms include visible worms from vent, bloating, weight loss despite eating, stringy white feces, lethargy, and anal redness. Heavy infestations cause intestinal blockage and death. Transmitted through infected live foods (especially copepods) or contaminated fish. Treatment requires deworming medications (levamisole, fenbendazole, praziquantel via food), treating entire tank, and avoiding live foods from untrustworthy sources. Multiple treatments 2-3 weeks apart needed to break lifecycle.',
                    imageUrl: null,
                    tags: ['Parasitic', 'Internal', 'Visible', 'Serious', 'Difficult'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'hexamita',
                    title: 'Hexamita/Hole-in-the-Head',
                    scientificName: 'Hexamita/Spironucleus species',
                    description: 'Parasitic flagellate infection primarily affecting cichlids and other large fish. Symptoms include pitted holes/erosions on head and lateral line, white stringy feces, loss of appetite, weight loss, darkening of color, and lethargy. Holes may ooze and become secondarily infected. Often associated with poor nutrition (vitamin/mineral deficiency) and stress. Treatment involves antiparasitic medications (metronidazole), improved diet with vitamin supplements (especially vitamin C and D), enhanced water quality, and reducing stress. Early treatment is critical; advanced cases may leave permanent scarring.',
                    imageUrl: null,
                    tags: ['Parasitic', 'Internal', 'Chronic', 'Treatable', 'Cichlid Disease'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'chilodonella',
                    title: 'Chilodonella',
                    scientificName: 'Chilodonella cyprini',
                    description: 'Microscopic ciliated protozoan parasite affecting skin and gills. Most problematic in cooler water (50-68°F). Symptoms include gray/white cloudy film on skin, excessive mucus production, respiratory distress, lethargy, scratching, and appetite loss. Gills may appear pale or swollen. Can cause rapid death in heavy infestations, especially in fry and weakened fish. Diagnosis requires microscopic examination. Treatment includes raising water temperature to 78-82°F (if species appropriate), salt baths, antiparasitic medications (formalin, malachite green), and improved water quality. Highly contagious; treat entire system.',
                    imageUrl: null,
                    tags: ['Parasitic', 'External', 'Microscopic', 'Treatable', 'Cold Water'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'saprolegnia',
                    title: 'Saprolegnia (True Fungus)',
                    scientificName: 'Saprolegnia species',
                    description: 'True fungal infection appearing as white, cotton-wool-like growths on skin, fins, gills, and eyes. Usually a secondary infection following injury, parasites, or bacterial disease. Symptoms include fluffy white patches, mat-like growth, lethargy, and difficulty breathing if gills affected. Spores are ubiquitous in water but only infect damaged tissue or stressed fish. Not contagious to healthy fish. Treatment involves antifungal medications (methylene blue, malachite green), salt baths (1 tsp/gallon for freshwater fish), improved water quality, and addressing underlying cause. Gentle removal of fungal mat may help. Protect eggs with methylene blue.',
                    imageUrl: null,
                    tags: ['Fungal', 'Secondary Infection', 'Treatable', 'Cotton-wool', 'Common'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'branchiomycosis',
                    title: 'Branchiomycosis (Gill Rot)',
                    scientificName: 'Branchiomyces species',
                    description: 'Fungal infection specifically targeting gill tissue, causing necrosis and rot. More common in warm water with high organic load. Symptoms include rapid, labored breathing, gasping at surface, gill discoloration (red, then gray/white necrosis), patches of dead gill tissue, lethargy, and sudden death. Gills may have a mottled appearance. Fish essentially suffocate as functional gill tissue is destroyed. Caused by Branchiomyces fungi thriving in warm (77-86°F), oxygen-poor, organically rich water. Treatment is difficult; includes aggressive water changes, lowering temperature if possible, increasing aeration, antifungal medications, and reducing organic load. Mortality rate is high; prevention is key.',
                    imageUrl: null,
                    tags: ['Fungal', 'Serious', 'Gill Disease', 'Difficult to Treat', 'Rare'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'lymphocystis',
                    title: 'Lymphocystis',
                    scientificName: 'Lymphocystivirus',
                    description: 'Viral infection causing cauliflower-like growths or white/pink nodules on fins, skin, and mouth. Infected cells become greatly enlarged (up to 100,000x normal size), visible to naked eye. Symptoms include raspberry-like clusters, white nodules, rough texture, but fish otherwise healthy. Non-fatal and usually self-limiting; immune system eventually controls it. Caused by iridovirus spread through contact or contaminated water. No specific treatment exists; focus on supporting immune system through excellent water quality, good nutrition, reduced stress, and quarantine of affected fish. Lesions may persist for weeks to months but typically resolve. Can recur during stress. Surgical removal possible for severe cosmetic cases.',
                    imageUrl: null,
                    tags: ['Viral', 'Benign', 'Non-treatable', 'Self-limiting', 'Cosmetic'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'carp-pox',
                    title: 'Carp Pox (Koi Herpesvirus variant)',
                    scientificName: 'Cyprinid herpesvirus 1 (CyHV-1)',
                    description: 'Viral infection causing waxy, smooth, raised growths on skin and fins of carp, koi, and goldfish. Growths appear milky-white, pink, or gray with a candle-wax texture. Symptoms include smooth raised lesions, usually appearing in cooler water (below 68°F) and disappearing in warmer temperatures. Non-fatal; fish remain otherwise healthy. Not the same as Koi Herpesvirus Disease (KHV/CyHV-3), which is deadly. Caused by Cyprinid herpesvirus 1, often stress-triggered. Virus remains dormant in fish for life; lesions may recur. No treatment or cure; manage by maintaining optimal temperature (above 70°F), reducing stress, and good husbandry. Quarantine to prevent spread, though most koi populations already carry the virus.',
                    imageUrl: null,
                    tags: ['Viral', 'Benign', 'Non-treatable', 'Temperature-dependent', 'Carp Family'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'swim-bladder-disorder',
                    title: 'Swim Bladder Disease/Disorder',
                    scientificName: 'Various causes (not pathogenic)',
                    description: 'Dysfunction of the swim bladder causing buoyancy problems. Not a disease but a symptom of various conditions. Symptoms include floating upside down or sideways, sinking to bottom, difficulty maintaining position, swimming at odd angles. Fish may struggle to swim or feed. Causes include overfeeding/constipation (most common), gulping air, bacterial/parasitic infection, injury, genetic defects, or poor water quality. Treatment depends on cause: fast fish for 24-48 hours, feed blanched peas or daphnia for constipation, treat infections if present, improve water quality, lower water level for surface feeders. Some cases (genetic, severe injury) may be permanent. Fancy goldfish and bettas are especially prone.',
                    imageUrl: null,
                    tags: ['Environmental', 'Digestive', 'Symptom', 'Treatable', 'Common'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'ammonia-poisoning',
                    title: 'Ammonia Poisoning',
                    scientificName: 'NH₃/NH₄⁺ toxicity',
                    description: 'Toxic buildup of ammonia in aquarium water, highly poisonous to fish. Ammonia burns gills and damages organs. Symptoms include red/purple gills, gasping at surface, lethargy, loss of appetite, red streaks in fins, mucus overproduction, and sudden death. Fish may lie on bottom or hang at surface. Caused by uncycled tanks, overstocking, overfeeding, inadequate filtration, dead organic matter, or disrupted biological filter. Test water immediately; even 0.25 ppm is harmful. Treatment involves immediate 50% water change (dechlorinated, temperature-matched), ceasing feeding for 24-48 hours, dosing with ammonia detoxifier (Prime, AmQuel), adding beneficial bacteria, and testing daily. Address underlying cause. Permanent damage possible.',
                    imageUrl: null,
                    tags: ['Environmental', 'Water Quality', 'Serious', 'Treatable', 'Toxic'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'nitrite-poisoning',
                    title: 'Nitrite Poisoning',
                    scientificName: 'NO₂⁻ toxicity (Brown Blood Disease)',
                    description: 'Toxic accumulation of nitrite during nitrogen cycle, causing methemoglobinemia (brown blood disease). Nitrite prevents hemoglobin from carrying oxygen. Symptoms include brown/purple gills, rapid breathing, gasping, lethargy, hanging at surface, loss of appetite, and death. Blood may appear brown if tested. Common during tank cycling (nitrite spike). Caused by incomplete nitrogen cycle, overfeeding, inadequate filtration, or filter disturbance. Treatment includes immediate water changes (50% daily), adding aquarium salt (1 tsp/gallon reduces nitrite toxicity), ceasing feeding, dosing with beneficial bacteria, and maintaining high oxygenation. Use API Nitrite test kit to monitor; should be 0 ppm. Recovery possible if caught early.',
                    imageUrl: null,
                    tags: ['Environmental', 'Water Quality', 'Serious', 'Treatable', 'Cycling'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'gas-bubble-disease',
                    title: 'Gas Bubble Disease',
                    scientificName: 'Supersaturation of dissolved gases',
                    description: 'Condition caused by supersaturation of oxygen or nitrogen in water, forming gas bubbles in fish tissues, blood, and organs. Similar to "the bends" in divers. Symptoms include visible bubbles under skin or in eyes, popeye, buoyancy problems, erratic swimming, fin/tissue damage, and death. Bubbles may be visible in fins, gills, or eyes. Caused by rapid temperature increase, leaking air lines creating fine bubbles, excessive photosynthesis in heavily planted tanks, or pump cavitation. Treatment involves vigorous aeration to off-gas excess dissolved gases, gradual water changes with degassed water, and identifying/fixing gas source. Reduce plant lighting if cause. Can be fatal; permanent damage possible.',
                    imageUrl: null,
                    tags: ['Environmental', 'Physical', 'Rare', 'Treatable', 'Bubbles'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'ph-shock',
                    title: 'pH Shock',
                    scientificName: 'Rapid pH change stress',
                    description: 'Acute stress response to rapid pH changes, causing cellular and osmotic damage. Fish can often adapt to wide pH ranges if changed gradually, but rapid shifts (0.5+ pH units in hours) are harmful. Symptoms include erratic swimming, gasping, mucus overproduction, lying on bottom, loss of color, lethargy, and sudden death. May occur after large water changes with different pH or when CO₂ injected tanks lose gas overnight. Caused by improper water changes, substrate/decoration pH effects, CO₂ fluctuations, or medication/chemical additions. Prevention is key: always match new water pH to tank, acclimate slowly (drip method), test before water changes. Treatment involves stabilizing pH, gentle aeration, and supportive care. Damage may be irreversible.',
                    imageUrl: null,
                    tags: ['Environmental', 'Water Chemistry', 'Serious', 'Preventable', 'Acute'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'oxygen-deprivation',
                    title: 'Oxygen Deprivation (Hypoxia)',
                    scientificName: 'Hypoxia/Anoxia',
                    description: 'Insufficient dissolved oxygen in water causing respiratory distress and organ damage. Fish require 5+ ppm O₂; below 3 ppm is critical. Symptoms include gasping at surface, rapid gill movement, lethargy, loss of appetite, gathering near outflow/aeration, and death. Fish may hang vertically at surface. Nocturnal oxygen depletion common in heavily planted tanks (plants consume O₂ at night). Caused by high temperature (warm water holds less O₂), overstocking, inadequate surface agitation, decaying matter, algae blooms, medications (some reduce O₂), or power outages. Treatment includes immediate aeration, surface agitation, partial water change with cooler water, reducing stocking, removing dead/decaying matter. Emergency: hydrogen peroxide dosing (follow guidelines carefully). Prevention critical.',
                    imageUrl: null,
                    tags: ['Environmental', 'Serious', 'Acute', 'Preventable', 'Respiratory'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'malnutrition',
                    title: 'Malnutrition/Vitamin Deficiency',
                    scientificName: 'Various nutritional deficiencies',
                    description: 'Chronic health problems caused by inadequate nutrition or vitamin deficiencies. Different deficiencies cause different symptoms. General symptoms include weight loss, stunted growth, lethargy, color loss, weakened immune system, deformities, and increased disease susceptibility. Specific deficiencies: Vitamin C causes spinal deformities, poor wound healing, hemorrhaging; Vitamin A causes eye problems, fin erosion; Thiamine causes neurological issues, loss of equilibrium; Vitamin E causes reproductive failure, fatty liver. Caused by poor diet quality, feeding only one food type, old/stale food (vitamins degrade), improper diet for species (herbivore fed only meat), or overprocessing. Treatment involves varied, high-quality diet appropriate for species, vitamin-enriched foods, fresh/frozen foods, and supplements (garlic-soaked food, vitamin drops). Prevention through proper nutrition is key. Recovery can take weeks to months.',
                    imageUrl: null,
                    tags: ['Nutritional', 'Chronic', 'Preventable', 'Treatable', 'Diet'],
                    category: 'diseases',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                }
            ],
            equipment: [
                {
                    id: 'filter',
                    title: 'Aquarium Filter',
                    scientificName: null,
                    description: 'Essential equipment that removes debris and maintains water quality through mechanical, chemical, and biological filtration. Types include hang-on-back (HOB), canister, sponge, and internal filters. Choose based on tank size and bioload.',
                    imageUrl: null,
                    tags: ['Essential', 'Water Quality', 'Various Types', 'Maintenance'],
                    category: 'equipment',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },
                {
                    id: 'heater',
                    title: 'Aquarium Heater',
                    scientificName: null,
                    description: 'Device that maintains stable water temperature for tropical fish. Most tropical species need 75-80°F. Choose wattage based on tank size (typically 3-5 watts per gallon). Always use a thermometer to monitor temperature.',
                    imageUrl: null,
                    tags: ['Essential', 'Temperature Control', 'Tropical Fish', 'Safety'],
                    category: 'equipment',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },
                {
                    id: 'test-kit',
                    title: 'Water Test Kit',
                    scientificName: null,
                    description: 'Tools to measure water parameters including pH, ammonia, nitrite, and nitrate levels. Essential for monitoring water quality and cycling new tanks. Available in liquid (more accurate) or strip forms.',
                    imageUrl: null,
                    tags: ['Essential', 'Water Quality', 'Monitoring', 'Cycling'],
                    category: 'equipment',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'air-stone-pump',
                    title: 'Air Stone/Air Pump',
                    scientificName: null,
                    description: 'Air pump pushes air through tubing to air stone, creating bubbles that increase surface agitation and gas exchange. Essential for tanks without adequate filtration movement, heavily stocked tanks, high temperatures (warm water holds less oxygen), or during medication (some reduce O₂). Also powers sponge filters and provides circulation. Choose pump rated for tank size. Noise can be reduced with check valves and dampening pads. Not needed in well-filtered, planted tanks with surface movement.',
                    imageUrl: null,
                    tags: ['Aeration', 'Oxygenation', 'Essential', 'Circulation'],
                    category: 'equipment',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'substrate',
                    title: 'Substrate',
                    scientificName: null,
                    description: 'Material covering aquarium bottom. Options include gravel (easy maintenance, inert), sand (natural look, fine grain good for burrowing fish like corydoras and loaches), soil (nutrient-rich for plants, lowers pH), bare bottom (easy cleaning, no aesthetic appeal). Substrate hosts beneficial bacteria critical for nitrogen cycle. Choose based on species needs: soft sand for bottom dwellers, plant substrate for planted tanks, larger gravel for ease of cleaning. Depth: 1-2 inches for gravel/sand, 2-3 inches for planted substrates. Rinse before adding to prevent cloudiness.',
                    imageUrl: null,
                    tags: ['Tank Setup', 'Beneficial Bacteria', 'Various Types', 'Aesthetics'],
                    category: 'equipment',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'protein-skimmer',
                    title: 'Protein Skimmer',
                    scientificName: null,
                    description: 'Device that removes dissolved organic compounds before they break down into ammonia. Uses fine bubbles to create foam that captures proteins, which is then collected in cup for disposal. Standard equipment in saltwater aquariums; rarely used in freshwater (only large, heavily stocked systems). Reduces bioload on biological filter, improves water clarity and quality, and lowers nitrate production. Not necessary for most freshwater setups; water changes and proper filtration are sufficient. Popular in reef tanks and high-bioload systems.',
                    imageUrl: null,
                    tags: ['Filtration', 'Advanced', 'Saltwater', 'Optional Freshwater'],
                    category: 'equipment',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                }
            ],
            terminology: [
                {
                    id: 'nitrogen-cycle',
                    title: 'Nitrogen Cycle',
                    scientificName: null,
                    description: 'The biological process where beneficial bacteria convert toxic ammonia (from fish waste) into nitrite, then into less toxic nitrate. Essential for establishing a healthy aquarium. Takes 4-8 weeks to complete in new tanks.',
                    imageUrl: null,
                    tags: ['Water Chemistry', 'Cycling', 'Essential Knowledge', 'Beneficial Bacteria'],
                    category: 'terminology',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },
                {
                    id: 'bioload',
                    title: 'Bioload',
                    scientificName: null,
                    description: 'The total amount of waste produced by all living organisms in the aquarium. Higher bioload requires better filtration and more frequent water changes. Measured by the "one inch of fish per gallon" rule (though this is oversimplified).',
                    imageUrl: null,
                    tags: ['Stocking', 'Water Quality', 'Filtration', 'Tank Management'],
                    category: 'terminology',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },
                {
                    id: 'quarantine-tank',
                    title: 'Quarantine Tank',
                    scientificName: null,
                    description: 'A separate tank used to isolate new fish or sick fish from the main display tank. Prevents disease spread and allows observation of new arrivals. Recommended to quarantine for 2-4 weeks before introducing fish to main tank.',
                    imageUrl: null,
                    tags: ['Disease Prevention', 'Best Practice', 'Separate Tank', 'Health'],
                    category: 'terminology',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'general-hardness',
                    title: 'General Hardness (GH)',
                    scientificName: null,
                    description: 'Measure of dissolved minerals (primarily calcium and magnesium) in water, expressed in degrees (dGH) or ppm. Affects osmoregulation in fish. Soft water: 0-6 dGH, moderate: 6-12 dGH, hard: 12-18 dGH, very hard: 18+ dGH. Different species have evolved for different hardness levels. Test with GH test kit. Adjust with remineralization products or RO water blending.',
                    imageUrl: null,
                    tags: ['Water Chemistry', 'Essential Knowledge', 'Testing', 'Minerals'],
                    category: 'terminology',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'carbonate-hardness',
                    title: 'Carbonate Hardness (KH)',
                    scientificName: null,
                    description: 'Measure of water\'s buffering capacity (carbonates/bicarbonates), stabilizes pH. Expressed in dKH or ppm. Higher KH prevents pH crashes from nitrification acids. Ideal: 3-8 dKH for most freshwater. Low KH causes pH instability; high KH resists pH adjustment. Critical for planted tanks with CO₂ injection. Test with KH test kit. Raise with baking soda or crushed coral; lower with RO water or peat.',
                    imageUrl: null,
                    tags: ['Water Chemistry', 'pH Buffer', 'Testing', 'Stability'],
                    category: 'terminology',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'acclimation',
                    title: 'Acclimation',
                    scientificName: null,
                    description: 'Process of gradually adjusting new fish to tank water parameters to prevent shock. Drip acclimation is safest: float bag for temperature (15-20 min), then slowly add tank water via airline tubing at 2-4 drips/second for 1-2 hours. For sensitive species, extend to 3-4 hours. Never add store water to tank. After acclimation, net fish (don\'t pour water) into tank. Especially important for pH, temperature, and salinity differences. Rushing causes stress, disease, and death.',
                    imageUrl: null,
                    tags: ['Best Practice', 'Stocking', 'New Fish', 'Stress Reduction'],
                    category: 'terminology',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'osmotic-stress',
                    title: 'Osmotic Stress',
                    scientificName: null,
                    description: 'Physiological stress caused by imbalance between fish\'s internal salt concentration and surrounding water. Freshwater fish constantly absorb water and excrete dilute urine. Saltwater fish lose water and drink constantly. Sudden changes in salinity, pH, or mineral content force fish to expend energy regulating internal balance, weakening immune system and causing disease susceptibility. Prevented by proper acclimation, stable parameters, and species-appropriate water conditions.',
                    imageUrl: null,
                    tags: ['Water Chemistry', 'Fish Health', 'Essential Knowledge', 'Physiology'],
                    category: 'terminology',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'tannins',
                    title: 'Tannins',
                    scientificName: null,
                    description: 'Natural organic compounds released by driftwood, leaves (Indian almond, oak), and peat, tinting water yellow/brown. Create "blackwater" conditions mimicking natural habitats of many South American and Southeast Asian species (bettas, tetras, rasboras, Apistogramma). Lower pH, soften water, have mild antibacterial/antifungal properties. Beneficial for many species; purely aesthetic issue for others. Remove with activated carbon if unwanted. Add via botanicals, driftwood, or commercial blackwater extract.',
                    imageUrl: null,
                    tags: ['Water Chemistry', 'Natural', 'pH Reducer', 'Blackwater'],
                    category: 'terminology',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'labyrinth-organ',
                    title: 'Labyrinth Organ',
                    scientificName: null,
                    description: 'Specialized respiratory organ in anabantoid fish (bettas, gouramis) allowing them to breathe atmospheric air. Located in chamber above gills. Evolved for survival in oxygen-poor, stagnant waters of Southeast Asia. Fish must access surface regularly; cannot survive in sealed containers. Allows survival in smaller tanks and poor water conditions (though not ideal). Explains why bettas/gouramis gulp air at surface. These species still use gills but supplement with atmospheric oxygen. If prevented from reaching surface, they will suffocate despite gills functioning.',
                    imageUrl: null,
                    tags: ['Fish Anatomy', 'Respiration', 'Anabantoids', 'Special Adaptation'],
                    category: 'terminology',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'shoaling-vs-schooling',
                    title: 'Shoaling vs. Schooling',
                    scientificName: null,
                    description: 'Often confused terms. Schooling: fish swimming in tight, synchronized formation moving as one (defense mechanism, rarely seen in aquariums except when threatened). Shoaling: fish living in loose groups, staying near each other but swimming independently. Most aquarium fish (tetras, rasboras, corydoras) are shoaling species requiring groups of 6-10+ for security and natural behavior. Kept alone or in pairs, they become stressed, hide, lose color, or become aggressive. "School of 6+" in care guides means minimum shoal size for wellbeing. Larger groups show better coloration and more natural behavior.',
                    imageUrl: null,
                    tags: ['Fish Behavior', 'Stocking', 'Social Structure', 'Essential Knowledge'],
                    category: 'terminology',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'harem-stocking',
                    title: 'Harem Stocking',
                    scientificName: null,
                    description: 'Stocking strategy for polygamous species (many Apistogramma, African cichlids, some livebearers) where one male is kept with multiple females. Common ratio: 1 male to 3-5 females. Distributes male aggression among several females instead of focusing on one, reducing stress and injury. Males are often territorial and aggressive toward other males; multiple males in undersized tanks results in fighting and death. Females establish hierarchy but usually coexist peacefully. Essential for breeding groups of mbuna, peacock cichlids, and dwarf cichlids. Requires adequate territory and hiding spots for each female.',
                    imageUrl: null,
                    tags: ['Stocking', 'Breeding', 'Cichlids', 'Social Structure'],
                    category: 'terminology',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                },

                {
                    id: 'territorial-aggression',
                    title: 'Territorial Aggression',
                    scientificName: null,
                    description: 'Aggressive behavior defending a specific area (territory) from intruders, especially conspecifics (same species). Common in cichlids, bettas, some gouramis, and breeding pairs of many species. Triggers include breeding (most species become territorial when spawning), insufficient space, lack of visual barriers, or too few females in harem species. Symptoms: chasing, fin nipping, physical attacks, stressed/injured fish, or dead tankmates. Manage by providing adequate tank size, caves/territories for each fish, visual barriers (plants, decorations), proper male:female ratios, and avoiding overstocking. Some species (Oscars, Jack Dempseys) require species-only tanks.',
                    imageUrl: null,
                    tags: ['Fish Behavior', 'Aggression', 'Tank Management', 'Cichlids'],
                    category: 'terminology',
                    author: 'System',
                    created: new Date().toISOString(),
                    firestoreId: null,
                    userId: null,
                    upvotes: 0,
                    verified: true
                }
            ]
        };
    }

    /**
     * Load glossary entries from Firestore
     * @param {string} category - Category to load (species, diseases, equipment, terminology)
     * @returns {Promise<Array>}
     */
    async loadFromFirestore(category) {
        if (!this.useFirestore) {
            return this.glossaryData[category] || [];
        }

        try {
            // Wait for Firebase to initialize with timeout
            const firebaseTimeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Firebase initialization timeout')), 10000)
            );

            // Wait for firebaseAuthReady to be defined
            let attempts = 0;
            while (!window.firebaseAuthReady && attempts < 200) {
                await new Promise(resolve => setTimeout(resolve, 50));
                attempts++;
            }

            if (!window.firebaseAuthReady) {
                console.warn('Firebase not initialized for glossary, using local data');
                return this.glossaryData[category] || [];
            }

            // Wait for Firebase initialization to complete or timeout
            await Promise.race([
                window.firebaseAuthReady,
                firebaseTimeout
            ]);

            // Import Firestore functions dynamically
            const { getFirestore, collection, query, where, getDocs } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            const db = getFirestore();

            // Query glossary collection for entries in this category
            const glossaryCollection = collection(db, this.firestoreCollection);
            const categoryQuery = query(glossaryCollection, where('category', '==', category));
            const snapshot = await getDocs(categoryQuery);

            if (snapshot.empty) {
                console.warn(`No ${category} entries found in Firestore, using local data`);
                return this.glossaryData[category] || [];
            }

            // Convert Firestore documents to glossary entry format
            const entries = snapshot.docs.map(doc => ({
                firestoreId: doc.id,
                ...doc.data()
            }));

            console.log(`✅ Loaded ${entries.length} ${category} entries from Firestore`);
            return entries;

        } catch (error) {
            console.error(`Error loading ${category} from Firestore:`, error);
            // Fallback to local data on error
            return this.glossaryData[category] || [];
        }
    }

    /**
     * Save a glossary entry to Firestore (future implementation)
     * @param {Object} entry - Glossary entry to save
     * @returns {Promise<boolean>}
     */
    async saveToFirestore(entry) {
        if (!this.useFirestore || !window.firebaseFirestore) {
            return false;
        }

        try {
            // Future Firestore implementation
            // const categoryConfig = this.categories.find(c => c.id === entry.category);
            // const collection = categoryConfig.firestoreSubcollection;
            // const docRef = await addDoc(collection(firestore, this.firestoreCollection, collection), entry);
            // return true;
            
            return false;
        } catch (error) {
            console.error('Error saving to Firestore:', error);
            return false;
        }
    }

    /**
     * Initialize the glossary UI
     */
    async init() {
        try {
            this.renderCategories();
            await this.renderContent();
        } catch (error) {
            console.error('Error initializing glossary:', error);
            this.showGlossaryError('Unable to load glossary data. Please <a href="javascript:location.reload()">refresh the page</a>.');
        }
    }

    /**
     * Show error state in glossary UI
     */
    showGlossaryError(message) {
        const contentContainer = document.getElementById('glossaryContent');
        if (contentContainer) {
            contentContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">⚠️</div>
                    <h3>Error Loading Glossary</h3>
                    <p style="margin-top: 1rem;">${message}</p>
                </div>
            `;
        }

        const categoriesContainer = document.getElementById('glossaryCategories');
        if (categoriesContainer) {
            categoriesContainer.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #dc3545;">
                    <p>Unable to load categories. Please refresh the page.</p>
                </div>
            `;
        }
    }

    /**
     * Render category cards
     */
    renderCategories() {
        const container = document.getElementById('glossaryCategories');
        if (!container) return;

        container.innerHTML = this.categories.map(category => {
            const count = (this.glossaryData[category.id] || []).length;
            const activeClass = this.currentCategory === category.id ? 'active' : '';
            
            return `
                <div class="category-card ${activeClass}" onclick="glossaryManager.selectCategory('${category.id}')">
                    <div class="category-icon">${category.icon}</div>
                    <div class="category-title">${category.title}</div>
                    <div class="category-count">${count} entries</div>
                </div>
            `;
        }).join('');
    }

    /**
     * Select a category
     * @param {string} categoryId 
     */
    async selectCategory(categoryId) {
        this.currentCategory = categoryId;
        this.searchTerm = '';
        document.getElementById('glossarySearch').value = '';
        
        this.renderCategories();
        await this.renderContent();
    }

    /**
     * Render glossary content
     */
    async renderContent() {
        const container = document.getElementById('glossaryContent');
        if (!container) return;

        // Load data (from Firestore in the future)
        const entries = await this.loadFromFirestore(this.currentCategory);
        
        // Filter based on search term
        const filteredEntries = this.filterEntries(entries);

        if (!this.currentCategory && !this.searchTerm) {
            // Show empty state
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📖</div>
                    <h3>Select a category above to browse</h3>
                    <p>Or use the search bar to find specific terms</p>
                </div>
            `;
            return;
        }

        if (filteredEntries.length === 0) {
            // Show no results
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <h3>No results found</h3>
                    <p>Try a different search term or browse by category</p>
                </div>
            `;
            return;
        }

        // Get category info
        const category = this.categories.find(c => c.id === this.currentCategory);
        const categoryTitle = category ? category.title : 'Search Results';

        // Render entries
        container.innerHTML = `
            <h2 class="section-title">${categoryTitle}</h2>
            <div class="glossary-items">
                ${filteredEntries.map(entry => this.renderEntry(entry)).join('')}
            </div>
        `;
    }

    /**
     * Render a single glossary entry
     * @param {Object} entry 
     * @returns {string}
     */
    renderEntry(entry) {
        const scientificName = entry.scientificName 
            ? `<div class="glossary-item-meta">${entry.scientificName}</div>` 
            : '';
        
        const verifiedBadge = entry.verified 
            ? '<span title="Verified by Comparium team">✓</span>' 
            : '';

        const tags = entry.tags && entry.tags.length > 0
            ? `<div class="glossary-item-tags">
                ${entry.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
               </div>`
            : '';

        return `
            <div class="glossary-item">
                <div class="glossary-item-title">
                    ${entry.title}
                    ${verifiedBadge}
                </div>
                ${scientificName}
                <div class="glossary-item-description">${entry.description}</div>
                ${tags}
            </div>
        `;
    }

    /**
     * Filter entries based on search term
     * @param {Array} entries 
     * @returns {Array}
     */
    filterEntries(entries) {
        if (!this.searchTerm) return entries;

        const term = this.searchTerm.toLowerCase();
        return entries.filter(entry => {
            return entry.title.toLowerCase().includes(term) ||
                   entry.description.toLowerCase().includes(term) ||
                   (entry.scientificName && entry.scientificName.toLowerCase().includes(term)) ||
                   (entry.tags && entry.tags.some(tag => tag.toLowerCase().includes(term)));
        });
    }

    /**
     * Search across all categories
     * @param {string} term 
     */
    async search(term) {
        this.searchTerm = term.trim();
        
        if (!this.searchTerm) {
            // Reset to current category view
            await this.renderContent();
            return;
        }

        // Search across all categories
        this.currentCategory = null;
        this.renderCategories();
        
        const container = document.getElementById('glossaryContent');
        if (!container) return;

        // Collect all matching entries from all categories
        let allMatches = [];
        for (const category of this.categories) {
            const entries = await this.loadFromFirestore(category.id);
            const filtered = entries.filter(entry => {
                const searchTerm = this.searchTerm.toLowerCase();
                return entry.title.toLowerCase().includes(searchTerm) ||
                       entry.description.toLowerCase().includes(searchTerm) ||
                       (entry.scientificName && entry.scientificName.toLowerCase().includes(searchTerm)) ||
                       (entry.tags && entry.tags.some(tag => tag.toLowerCase().includes(searchTerm)));
            });
            allMatches = allMatches.concat(filtered);
        }

        if (allMatches.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <h3>No results found for "${this.searchTerm}"</h3>
                    <p>Try a different search term or browse by category</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <h2 class="section-title">Search Results (${allMatches.length})</h2>
            <div class="glossary-items">
                ${allMatches.map(entry => this.renderEntry(entry)).join('')}
            </div>
        `;
    }
}

// Initialize glossary manager
const glossaryManager = new GlossaryManager();

// Wait for DOM to load with error handling
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        glossaryManager.init().catch(error => {
            console.error('Fatal glossary initialization error:', error);
            glossaryManager.showGlossaryError('Critical error loading glossary. Please refresh the page.');
        });
    });
} else {
    glossaryManager.init().catch(error => {
        console.error('Fatal glossary initialization error:', error);
        glossaryManager.showGlossaryError('Critical error loading glossary. Please refresh the page.');
    });
}

/**
 * Search function called from HTML
 */
function searchGlossary() {
    const searchInput = document.getElementById('glossarySearch');
    if (searchInput) {
        glossaryManager.search(searchInput.value);
    }
}

/**
 * Show contribution information
 */
function showContributeInfo() {
    if (window.authManager && !window.authManager.isLoggedIn()) {
        window.authManager.showMessage('Please log in to contribute to the glossary', 'info');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }

    // Future: Open contribution form
    alert('Contribution feature coming soon! This will allow logged-in users to submit glossary entries for review. All contributions will be stored in Firestore and reviewed by the Comparium team before being published.');
}
