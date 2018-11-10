'use strict';

const resourcesId = '#resources';

const resourceData = [
    {
        name: "Watering Can",
        img: "",
        link: "https://www.amazon.com/dp/B01N0AO16F/ref=sxts_kp_tr_2?pf_rd_m=ATVPDKIKX0DER&pf_rd_p=8778bc68-27e7-403f-8460-de48b6e788fb&pd_rd_wg=haDiO&pf_rd_r=ZM52ZS0ZV2TB4QPGC6TE&pf_rd_s=desktop-sx-top-slot&pf_rd_t=301&pd_rd_i=B01N0AO16F&pd_rd_w=lejQc&pf_rd_i=watering+can&pd_rd_r=cd4264a2-036d-4e65-8a07-4cf85fcea27b&ie=UTF8&qid=1541749631&sr=2?_encoding=UTF8&camp=1789&creative=9325&linkCode=ur2&tag=storypodca-20&linkId=2P4S6EY6B462X4AR",
        description: [
            "~$10 - 30",
            "An indispensible tool for any gardener",
            "Portable water source",
            "Waters window boxes, pots, etc."
        ]
    },
    {
        name: "Hand Trowel",
        img: "",
        link: "https://www.amazon.com/Fiskars-384220-1001-Ergo-Trowel/dp/B004S0PGPM/ref=sr_1_3?ie=UTF8&qid=1541750546&sr=8-3&keywords=hand+trowel?_encoding=UTF8&camp=1789&creative=9325&linkCode=ur2&tag=storypodca-20&linkId=2P4S6EY6B462X4AR",
        description: [
            "~$5 - 20",
            "Useful for planting bedded plants",
            "Used in flower beds, planters, pots, and window boxes"
        ]
    },
    {
        name: "Shovel",
        img: "",
        link: "https://www.amazon.com/Bond-LH015-Mini-Handle-Shovel/dp/B000X47NJY/ref=sr_1_4?s=lawn-garden&ie=UTF8&qid=1541751224&sr=1-4&keywords=shovel?_encoding=UTF8&camp=1789&creative=9325&linkCode=ur2&tag=storypodca-20&linkId=2P4S6EY6B462X4AR",
        description: [
            "~$15 - 50",
            "Useful for planting bigger plants (trees, shrubs, flowers",
            "Also used for hoeing weeds and edging flower beds",
            "Make sure that your shovel has a sharp blade to easily dig through dirt"
        ]
    }
];


class ResourceComponent extends React.Component {
    render() {
        return (
            <div>
                {/* <h3>{this.props.resource.name}</h3> */}
                {this.props.resource.description.forEach((item) =>
                    item)}
            </div>
        );
    }
}

function ResourceList() {
    return resourceData.map((r) => <ResourceComponent resource={r} />);
}

ReactDOM.render(<ResourceList />, document.querySelector(resourcesId));