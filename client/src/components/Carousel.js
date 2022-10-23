import { useSpringCarousel } from 'react-spring-carousel'

export default function SpringCarousel() {
    const { carouselFragment } = useSpringCarousel({
        items: [
            {
                id: 'item-1',
                renderItem: (
                    <div>
                        <img alt="harry poter" src ="https://www.e-vrit.co.il/Images/Products/YediotMasters/HarryPottter2_Master.jpg" width={100}/>
                        <h3>הארי פוטר 2</h3>
                        <span className="genre">ז'אנר: מדע בדיוני</span>
                    </div>
                )
            },
            {
                id: 'item-2',
                renderItem: (
                    <div>
                        <img alt="lord of rings" src="https://www.kinbooks.co.il/media/catalog/product/cache/e45a32e678c58b322b36604fa3d2c1b9/103/134/83/10313483.jpg" width={120}/>
                        <h3>שר הטבעות - שלושת הספרים</h3>
                        <span className="genre">ז'אנר: מדע בדיוני</span>
                    </div>
                )
            },
            {
                id: 'item-3',
                renderItem: (
                    <div>
                        <img alt="harry poter" src ="https://www.e-vrit.co.il/Images/Products/YediotMasters/HarryPottter2_Master.jpg" width={100}/>
                        <h3>הארי פוטר 2</h3>
                        <span className="genre">ז'אנר: מדע בדיוני</span>
                    </div>
                )
            },
            {
                id: 'item-4',
                renderItem: (
                    <div>
                        <img alt="lord of rings" src="https://www.kinbooks.co.il/media/catalog/product/cache/e45a32e678c58b322b36604fa3d2c1b9/103/134/83/10313483.jpg" width={120}/>
                        <h3>שר הטבעות - שלושת הספרים</h3>
                        <span className="genre">ז'אנר: מדע בדיוני</span>
                    </div>
                )
            },
            {
                id: 'item-5',
                renderItem: (
                    <div>
                        <img alt="harry poter" src ="https://www.e-vrit.co.il/Images/Products/YediotMasters/HarryPottter2_Master.jpg" width={100}/>
                        <h3>הארי פוטר 2</h3>
                        <span className="genre">ז'אנר: מדע בדיוני</span>
                    </div>
                )
            },
            {
                id: 'item-6',
                renderItem: (
                    <div>
                        <img alt="lord of rings" src="https://www.kinbooks.co.il/media/catalog/product/cache/e45a32e678c58b322b36604fa3d2c1b9/103/134/83/10313483.jpg" width={120}/>
                        <h3>שר הטבעות - שלושת הספרים</h3>
                        <span className="genre">ז'אנר: מדע בדיוני</span>
                    </div>
                )
            }
        ]
    })

    return (
        <div>
            {carouselFragment}
        </div>
    );
}