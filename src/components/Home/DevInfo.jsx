const DevInfo = () => {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 ">
        <div className="flex flex-col gap-16 xl:flex-row">
          <div className="card bg-base-100 px- shadow-xl md:mx-auto lg:mx-0 ">
            <div className="card-body space-y-4">
              <h2 className="card-title text-2xl"> Technologies and Skills </h2>
              <div className="py-2 ">
                <h4 className="pb-3 font-bold">Expert:</h4>
                <p>
                  HTML5, CSS3, Tailwind Css, Material Ui , JavaScript,
                  TypeScript , React js, Next js, Redux
                </p>
              </div>
              <div className="py-2 ">
                <h4 className="pb-3 font-bold">Comfortable:</h4>
                <p>
                  MongoDB, Mongoose, Express, Node Js, Rest Api , TanStack
                  Query, Context Api , Bootstrap
                </p>
              </div>
              <div className="py-2 ">
                <h4 className="pb-3 font-bold">Tools &amp; Others:</h4>
                <p>
                  Git, GitHub, VS Code, Figma, Vercel, Netlify, Chrome Dev
                  Tools.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="flex flex-col ">
              <h2 className="relative mb-3 text-3xl font-medium before:absolute  before:-top-[2rem] before:hidden before:opacity-40 lg:text-4xl lg:font-extrabold before:lg:block">
                Emtiaz Emon
              </h2>
              <p className="text-primary mb-4 font-semibold">Web Developer</p>
              
              <div>
                <h4 className="pt-3 text-xl font-bold">
                  Professional Experience
                </h4>
              </div>
              <div className="card bg-base-100 pb- shadow-xl ">
                <div className="card-body space-y-3">
                  <div className="py-3 ">
                    <h4 className="pb-2 font-bold">
                      Xplainerr (February 2013 - April 2024)
                    </h4>
                    <p>
                      I worked here as a Frontend Developer . Building
                      interactive UI as per company requirements using Nextjs,
                      Redux .Collaborate with other team members to design ,
                      code quality and user experiences.Convert Figma file to
                      functional, reusable components and responsive design
                    </p>
                  </div>
                  <div className="py- ">
                    <h4 className="pb-2 font-bold">
                      DS Legend Pvt Ltd (1 Oct 2022 – 30 Dec 2022)
                    </h4>
                    <p>
                      I worked here as a Frontend Developer <b>Intern</b>.
                      Adding new UI elements and React components, and
                      integrating them with the application.Handling the backend
                      API data in Frontend.Maintaining code re-usability,
                      optimization, and manage project GitHub collaboration,
                      pull request.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="pt-8 text-xl font-bold">Education </h4>
              </div>
              <div className="card bg-base-100  shadow-xl ">
                <div className="card-body space-y-1">
                  <div className="py-3 ">
                    <h4 className="pb-2 font-bold">
                      Uttara University (2023 - Present)
                    </h4>
                    <p>
                      After complete my HSC 2020 . i don&apos;t admit any
                      university . After 2 years of gap I admitted my self in
                      this university in BBA program . My 3rd semester is going .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevInfo;
