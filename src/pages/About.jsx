import { Link } from "react-router-dom";
import Container from "../components/Container";
import { ShoppingBasket, Clock, Car, Leaf, Heart, Truck, Store, ArrowRight, ShieldCheck,} from "lucide-react";
import aboutBackgroundImage from "../assets/images/aboutpage_Image.jpg";

// Provision for a hero background image — leave as null for now.
// When ready, import your image and set this to it, e.g.:
// import aboutBackground from "../assets/images/about_hero.jpg";
// const aboutBackgroundImage = null;

export default function About() {
  return (
    <main className="text-gray-900 dark:text-gray-50">
    {/* Hero */}
<section className="relative">
  {aboutBackgroundImage ? (
    <>
      <img
        src={aboutBackgroundImage}
        alt="BuyFromHome Stores"
        className="w-full h-auto"
      />
      <div className="absolute inset-0 bg-black/40" />
    </>
  ) : (
    <div className="bg-neutral-100 dark:bg-neutral-950" />
  )}

  {aboutBackgroundImage ? (
    <>
      {/* Headline block — sits in the open upper area */}
      <Container className="absolute top-0 left-0 right-0 pt-16 md:pt-24">
        <div className="max-w-4xl">
          <p className="font-semibold uppercase tracking-widest text-sm mb-4 text-primary-300">
            Welcome to BuyFromHome Stores
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
            You crave a home-cooked meal.
            <span className="text-primary-500"> The market has other plans.</span>
          </h1>
        </div>
      </Container>

      {/* Supporting copy — sits lower, above the busy foreground */}
      <Container className="absolute top-[42%] left-0 right-0">
        <div className="max-w-2xl">
          <p className="text-lg md:text-xl leading-relaxed text-white/90">
            Here's something we noticed: people don't order fast food because
            they've stopped caring about real, home-cooked meals. They order
            it because the market got in the way — again. BuyFromHome Stores
            exists to give that meal back to you, without the trip.
          </p>
        </div>
      </Container>
    </>
  ) : (
    <Container className="py-24 md:py-32">
      <div className="max-w-4xl">
        <p className="text-primary-500 font-semibold uppercase tracking-widest text-sm mb-4">
          Welcome to BuyFromHome Stores
        </p>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          You crave a home-cooked meal.
          <span className="text-primary-500"> The market has other plans.</span>
        </h1>

        <p className="text-lg md:text-xl leading-relaxed max-w-3xl text-gray-600 dark:text-gray-400">
          Here's something we noticed: people don't order fast food because
          they've stopped caring about real, home-cooked meals. They order
          it because the market got in the way — again. BuyFromHome Stores
          exists to give that meal back to you, without the trip.
        </p>
      </div>
    </Container>
  )}
</section>

      {/* The Story */}
      <section>
        <Container className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-primary-500 font-semibold uppercase tracking-widest text-sm mb-3">
                Our Story
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                It started with a simple question.
              </h2>

              <div className="space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Why do so many people who genuinely love home-cooked food
                  still end up ordering another plate of fast food?
                </p>

                <p>
                  The answer had nothing to do with taste. It was never about
                  preference. It was about time, energy, and the sheer effort
                  it takes to actually get to the market — and get back with
                  everything you set out for.
                </p>

                <p>
                  Traffic that eats your afternoon. The walking, the
                  searching, the price comparisons, the back-and-forth
                  negotiating. Carrying bags through crowded paths. And by the
                  time you're finally home, cooking is the last thing you have
                  energy left for.
                </p>

                <p className="text-gray-900 dark:text-gray-100 font-medium text-lg">
                  The market wasn't just taking your money. It was quietly
                  taking the meal itself — replacing it with whatever was
                  fastest to order instead.
                </p>

                <p>That's the problem BuyFromHome Stores was built to solve.</p>
              </div>
            </div>

            <div className="bg-neutral-100 dark:bg-neutral-950 rounded-2xl p-8 md:p-10">
              <ShoppingBasket size={48} className="text-primary-500 mb-6" />

              <h3 className="text-2xl font-bold mb-4">
                Why should real food cost you your whole afternoon?
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                It shouldn't. Your time matters. Your energy matters. And
                wanting a proper home-cooked meal shouldn't mean choosing
                between your schedule and your kitchen.
              </p>

              <div className="mt-8 border-l-4 border-primary-500 pl-5">
                <p className="text-xl font-semibold italic">
                  "We deal with the market palava. You enjoy your home."
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What BFH Is */}
      <section className="bg-neutral-100 dark:bg-neutral-950">
        <Container className="py-20 md:py-28">
          <div className="max-w-3xl mb-14">
            <p className="text-primary-500 font-semibold uppercase tracking-widest text-sm mb-3">
              Not Your Regular E-Commerce
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              We're not another online store. We're your market run.
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              BuyFromHome Stores is built around one thing: getting real,
              fresh food into your home without the palava. Meat, fruits,
              vegetables, oils, grains — every farm produce or food item you'd
              normally cross Lagos traffic for, we bring to your doorstep
              instead.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6">
              <Leaf className="text-primary-500 mb-5" size={32} />
              <h3 className="font-bold text-xl mb-3">Fresh Produce</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Fresh fruits, vegetables and farm produce for your everyday
                needs.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6">
              <Heart className="text-primary-500 mb-5" size={32} />
              <h3 className="font-bold text-xl mb-3">Meat & Protein</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                The meat and protein your kitchen needs, without another trip
                to the market.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6">
              <Store className="text-primary-500 mb-5" size={32} />
              <h3 className="font-bold text-xl mb-3">Food Products</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                From cooking essentials to everyday food items, get what your
                kitchen needs.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6">
              <ShieldCheck className="text-primary-500 mb-5" size={32} />
              <h3 className="font-bold text-xl mb-3">Genuinely Fresh</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                No shortcuts, no force-ripened produce — just food the way
                nature actually made it, like real, freshly produced palm oil.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* The Problem */}
      <section>
        <Container className="py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-primary-500 font-semibold uppercase tracking-widest text-sm mb-3">
              The Problem We Solve
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The market shouldn't take your whole day.
            </h2>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Buying food can be simple. But the journey to get it isn't
              always simple, especially in a busy city like Lagos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto size-16 rounded-full bg-primary-100 dark:bg-primary-950 flex items-center justify-center mb-5">
                <Car className="text-primary-500" size={30} />
              </div>
              <h3 className="text-xl font-bold mb-3">Traffic</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                You shouldn't have to spend hours in traffic just to buy
                groceries for your home.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto size-16 rounded-full bg-primary-100 dark:bg-primary-950 flex items-center justify-center mb-5">
                <Clock className="text-primary-500" size={30} />
              </div>
              <h3 className="text-xl font-bold mb-3">Lost Time</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Your time is valuable. A market trip can consume hours that
                could have been spent with family, work or simply resting.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto size-16 rounded-full bg-primary-100 dark:bg-primary-950 flex items-center justify-center mb-5">
                <ShoppingBasket className="text-primary-500" size={30} />
              </div>
              <h3 className="text-xl font-bold mb-3">Market Palava</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Searching, negotiating, carrying bags and moving from one
                place to another can make a simple shopping trip exhausting.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Solution */}
      <section className="bg-neutral-100 dark:bg-neutral-950">
        <Container className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-primary-500 font-semibold uppercase tracking-widest text-sm mb-3">
                Our Solution
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                We handle the palava. You stay home.
              </h2>

              <div className="space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Instead of you fighting traffic and market stress,
                  BuyFromHome Stores brings the whole market experience to
                  you.
                </p>

                <p>
                  Browse what you need, place your order, and let us handle
                  the journey — from sourcing to your doorstep.
                </p>

                <p>
                  Meat for the weekend. Vegetables for tonight's dinner.
                  Fruits for the family. Cooking oil, grains, or any other
                  food essential — our job is to make getting them effortless.
                </p>

                <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                  You shouldn't have to fight Lagos traffic to put good food
                  on your table.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center">
              <div className="size-64 md:size-80 rounded-full bg-primary-100 dark:bg-primary-950 flex items-center justify-center">
                <Truck size={120} strokeWidth={1.2} className="text-primary-500" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section>
        <Container className="py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-primary-500 font-semibold uppercase tracking-widest text-sm mb-3">
              How BuyFromHome Works
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              From market stress to doorstep simplicity.
            </h2>

            <p className="text-gray-600 dark:text-gray-400">
              We take the difficult part out of getting the food you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="mx-auto size-14 rounded-full bg-primary-500 text-white flex items-center justify-center text-xl font-bold mb-5">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Choose What You Need</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse our selection of fresh farm produce and food products
                from the comfort of your home.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto size-14 rounded-full bg-primary-500 text-white flex items-center justify-center text-xl font-bold mb-5">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Place Your Order</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Add what you need to your cart, checkout and provide your
                delivery details.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto size-14 rounded-full bg-primary-500 text-white flex items-center justify-center text-xl font-bold mb-5">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">We Bring It Home</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We handle the market run and work to get your order delivered
                to your doorstep.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-neutral-100 dark:bg-neutral-950">
        <Container className="py-20 md:py-28">
          <div className="max-w-3xl mb-12">
            <p className="text-primary-500 font-semibold uppercase tracking-widest text-sm mb-3">
              What We Believe
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              Built around your time, your home and your food.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-900 p-7 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Freshness Matters</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Food is personal. That's why we source produce the way nature
                intended — nothing force-ripened, nothing rushed. Just real,
                fresh quality you can confidently bring home to your family.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-7 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Your Time Matters</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We believe your time should be spent on the things that matter
                to you — not lost in traffic and market queues.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-7 rounded-xl">
              <h3 className="text-xl font-bold mb-3">
                Convenience Should Be Meaningful
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Convenience isn't simply having an app. It means removing the
                difficult parts of the shopping process and making life
                genuinely easier.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-7 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Home Comes First</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                At the heart of everything we do is the home — the people,
                meals, moments and memories that make it special.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section>
        <Container className="py-24 md:py-32 text-center">
          <p className="text-primary-500 font-semibold uppercase tracking-widest text-sm mb-4">
            Welcome to BuyFromHome Stores
          </p>

          <h2 className="text-3xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight mb-6">
            Let us handle the market palava.
            <br />
            <span className="text-primary-500">You enjoy your home.</span>
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
            Fresh food, farm produce and everyday essentials delivered to your
            doorstep — without the stress of making the trip yourself.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
          >
            Start Shopping
            <ArrowRight size={18} />
          </Link>
        </Container>
      </section>
    </main>
  );
}