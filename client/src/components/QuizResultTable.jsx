// file: client/src/components/QuizResultTable.jsx

import React from "react";

export default function QuizResultTable({result}) {

    const resultBiographies = {
        "Life of the Party": "You love nothing more than meeting up with family and friends and having a good time, making those memories. Only problem is, this involves leaving the house and spending your hard-earned cash... Bars, clubs, restaurants, any venue you might visit has some kind of price tag, so watch out! Consider free options like museums, parks, or a big night in with homemade cocktails. You can still be a social bee and save those coins if you're savvy!",
        "Fine Diner": "You appreciate the finer things in life, and so do your tastebuds, whether that be a vintage wine to be savoured or some salty fastfood fries, crisped to perfection. Of course, it costs money to buy the food and drink we crave the most. Consider swapping restaurants or takeaways for homemade alternatives and packed lunches, and make small changes like tap water for the table instead of the more expensive beverages. It all adds up!",
        "Jet Setter": "You dream of your next getaway, be it to the next town over or halfway across the world. A change of scenery gives you a fresh perspective on the world, and you can really let loose. But alongside fuel for your car, or plane/train tickets, there's the accomodation, the giant chocolate bars at duty-free, restaurants, and entry tickets (you've got to see the Parthenon after all!) Watch out for hidden costs like extra baggage for the plane! These things add up like a snowball rolling down a hill, so go in with your eyes wide open and with a clear, strict budget in mind. Take cash to limit your spending and keep your eye on those price tags!",
        "Self-Care Guru": "You love to look after your body and feel fantastic. As well as looking great, you feel great too. But mounting gym fees, vitamin supplements, and skin products can have expensive price tags. For your beauty procudts, keep an eye out for cheaper dupes that have the same powerhouse ingredients, and when exercising, consider if there's a cheaper option, such as running outside rather than hitting the treadmill at the gym (let's hope for good weather!) Self-care is important, and you don't have to sacrifice your savings in order to achieve that pampering you deserve.",
        "Fun Seeker": "You are always looking for the next activity to bring some fun into your life, be it streaming the newest hit K-drama online, attending your favourite artists' concert and screaming the lyrics, beating that mega-hard boss in the endgame of that JRPG, or getting lost in a good book. It can be hard not to get sucked into buying more and more, until the books are stacking up against the wall, unread. Buy your entertainment with intention: do you need this game now, or can you wait for it to go on sale at christmas? Do you have the time to watch a new streaming service, or is your list of unwatched crime documentaries already brimming over? Try not to get sucked into the trap of the shiny and new, and work your way through what you've got tucked away at home. And as for the concerts and musicals... time to create a savings goal!",
    };

    return (
        <div className="result-table">
            <h2>{result}</h2>
            <p>{resultBiographies[result] || "No description available."}</p>
        </div>
    );
};