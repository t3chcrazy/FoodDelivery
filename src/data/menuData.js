const menuData = [
    {
        title: "Best sellers",
        data: [
            {
                name: "Choco Lava cake",
                desc: "Chocolate Lovers delight! gooey molten lava inside chocolate cake",
                stars: 4,
                price: 99,
                isBest: true,
                image: require("../assets/img/choco.png"),
                isVeg: false
            },
            {
                name: "Chicken Pizza",
                desc: "Succulent chicken pizza",
                stars: 3,
                price: 95,
                isBest: true,
                image: require("../assets/img/paneer.png"),
                isVeg: false
            },
            {
                name: "Garlic Breadsticks",
                desc: "Baked to Perfection. Your perfect pizza partner",
                stars: 4,
                price: 99,
                isBest: true,
                image: require("../assets/img/garlic.png"),
                isVeg: true
            },
        ]
    },
    {
        title: "Veg Pizza",
        data: [
            {
                name: "Margarita",
                desc: "A classic delight loaded with 100% real mozzarella",
                stars: 4,
                price: 99,
                isBest: false,
                image: require("../assets/img/margarita.png"),
                isVeg: true
            },
            {
                name: "Cheese n Corn",
                desc: "Sweet & Juice Golden corn and 100% real mozzarella",
                stars: 3,
                price: 165,
                isBest: false,
                image: require("../assets/img/corn.png"),
                isVeg: true
            },
            {
                name: "Achari do pyaza",
                desc: "Sweet and sour pizza",
                stars: 2,
                price: 80,
                isBest: false,
                image: require("../assets/img/subway.png"),
                isVeg: true
            }
        ]
    }
]

export default menuData