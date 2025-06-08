import companyInfo from "../assets/company-info.txt?raw";

const CompanyInfo = () => {
  return (
    <div className="text-blueTheme-text p-6 text-center">
      <h2 className="text-sm md:text-lg lg:text-3xl font-bold">
        About the Company
      </h2>
      <p className="mt-4 text-xs md:text-md lg:text-lg">{companyInfo}</p>
    </div>
  );
};

export default CompanyInfo;
