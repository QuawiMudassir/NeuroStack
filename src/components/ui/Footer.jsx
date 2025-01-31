import logo from '../../assets/logo.png'

const products = [
  { name: 'Neural Net X', description: 'NeuroTech for real-time brain computing', href: '#' },
  { name: 'Assistance PAL', description: 'Our AI Powered healthcare professional', href: '#' },
  { name: 'Security', description: 'Your customer’s data will be safe and secure', href: '#' },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#' },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#' },
];

export default function Footer() {
  return (
    <div>
        <div className="h-[50vh] flex items-center justify-between px-10 border-t-4 border-[#008170]">
        {/* Left Column - Image */}
        <div className="w-1/2 mr-10">
            <img src={logo} alt="Logo or Image" className="h-16 object-contain" />
        </div>

        {/* Right Column - Navbar Items */}
        <div className="w-1/2 text-[#008170] text-left">
            <div className="flex justify-between mb-4">
            <div>
                <h3 className="font-semibold text-xl">Products</h3>
                <ul>
                {products.map((product, index) => (
                    <li key={index} className="my-2">
                    <a href={product.href}>
                        <span>{product.name}</span>
                    </a>
                    </li>
                ))}
                </ul>
            </div>

            <div>
                <h3 className="font-semibold text-xl">Features</h3>
                <ul>
                <li className="my-2">
                    <a href="#">Core Features</a>
                </li>
                <li className="my-2">
                    <a href="#">Benefits</a>
                </li>
                <li className="my-2">
                    <a href="#">Solutions</a>
                </li>
                </ul>
            </div>

            <div>
                <h3 className="font-semibold text-xl">Company</h3>
                <ul>
                <li className="my-2">
                    <a href="#">About Us</a>
                </li>
                <li className="my-2">
                    <a href="#">Careers</a>
                </li>
                <li className="my-2">
                    <a href="#">Contact</a>
                </li>
                </ul>
            </div>
            </div>
        </div>
        </div>
        <p className='text-[#008170]  text-l'>&#169; NeuroStack  All Right Reserved</p>
    </div>
  );
}
