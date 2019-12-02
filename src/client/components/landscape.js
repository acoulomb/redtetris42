import React from 'react'

const Landscape = () => {
    return (
        <div className="landscape">
            <div className="ground"></div>
            <div className="lune"></div>
            <img draggable="false" className="tree tree-xl" style={{ left: '0%', 'zIndex': 100 }} src="/assets/tree.png" />
            <img draggable="false" className="tree tree-xl" style={{ left: '100%', 'zIndex': 100 }} src="/assets/tree.png" />
            <img draggable="false" className="tree tree-xl" style={{ left: '12%', 'zIndex': 300 }} src="/assets/tree.png" />
            <img draggable="false" className="tree tree-xl" style={{ left: '80%', 'zIndex': 300 }} src="/assets/tree.png" />
            <img draggable="false" className="tree tree-xl" style={{ left: '50%', 'zIndex': 300 }} src="/assets/tree.png" />

            <img draggable="false" className="tree tree-md" style={{ left: '5%', 'zIndex': -100 }} src="/assets/tree.png" />
            <img draggable="false" className="tree tree-md" style={{ left: '20%', 'zIndex': -100 }} src="/assets/tree.png" />
            <img draggable="false" className="tree tree-sm" style={{ left: '30%', 'zIndex': -200 }} src="/assets/tree.png" />
            <img draggable="false" className="tree tree-sm" style={{ left: '40%', 'zIndex': -200 }} src="/assets/tree.png" />
            <img draggable="false" className="tree tree-sm" style={{ left: '50%', 'zIndex': -200 }} src="/assets/tree.png" />
            <img draggable="false" className="tree tree-sm" style={{ left: '60%', 'zIndex': -300 }} src="/assets/tree.png" />
            <img draggable="false" className="tree tree-sm" style={{ left: '70%', 'zIndex': -300 }} src="/assets/tree.png" />
            <img draggable="false" className="tree tree-sm" style={{ left: '80%', 'zIndex': -300 }} src="/assets/tree.png" />
            <img draggable="false" className="tree tree-sm" style={{ left: '90%', 'zIndex': -300 }} src="/assets/tree.png" />
            <img draggable="false" className="tree tree-sm" style={{ left: '100%', 'zIndex': -300 }} src="/assets/tree.png" />
            <img draggable="false" className="tree" style={{ left: '15%', 'zIndex': 100 }} src="/assets/tree.png" />
            <img draggable="false" className="tree" style={{ left: '75%', 'zIndex': 100 }} src="/assets/tree.png" />

            <img draggable="false" className="vegetation" src="/assets/brindille.png" style={{ left: '0%' }} />
            <img draggable="false" className="vegetation" src="/assets/brindille.png" style={{ left: '15%' }} />
            <img draggable="false" className="vegetation" src="/assets/brindille.png" style={{ left: '30%' }} />

            <img draggable="false" className="vegetation" src="/assets/brindille.png" style={{ left: '80%' }} />
            <img draggable="false" className="vegetation" src="/assets/brindille.png" style={{ left: '75%' }} />
            <img draggable="false" className="vegetation" src="/assets/brindille.png" style={{ left: '60%' }} />
            
            <img draggable="false" className="vegetation" src="/assets/roseau.png" style={{ left: '25%' }} />
            <img draggable="false" className="vegetation" src="/assets/roseau.png" style={{ left: '40%' }} />
            <img draggable="false" className="vegetation" src="/assets/roseau.png" style={{ left: '8%' }} />
            <img draggable="false" className="vegetation" src="/assets/roseau.png" style={{ left: '70%' }} />
            <img draggable="false" className="vegetation" src="/assets/roseau.png" style={{ left: '60%' }} />
            <img draggable="false" className="vegetation" src="/assets/roseau.png" style={{ left: '90%' }} />

            <div className="camp">
                <div className="bubble-menu">Hello, wanna play?</div>
                <img draggable="false" className="wilson" src="/assets/wilson.png" />
                <img draggable="false" className="tente" src="/assets/tente.png" />
                <img draggable="false" className="fire" src="/assets/fire.png" />
            </div>
        </div>
    )
}

export default Landscape