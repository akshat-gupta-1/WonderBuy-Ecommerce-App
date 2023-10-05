import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';
interface MobileAccordionProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  components: { title: string; href: string; img?: string }[];
  title: string;
}
interface MobileLinkProps {
  children?: ReactNode;
  href: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function MobileLink({ children, href, setIsOpen }: MobileLinkProps) {
  return (
    <Link
      to={href}
      className="text-slate-11 hover:text-slate-12"
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );
}
const MobileAccordion = ({
  setIsOpen,
  components,
  title,
}: MobileAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="Categories">
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col space-y-2">
            {components.map((item) => (
              <MobileLink
                href={item.href}
                key={item.title}
                setIsOpen={setIsOpen}
              >
                {item.title}
              </MobileLink>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MobileAccordion;
