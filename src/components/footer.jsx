export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Natanael Isaac. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-2 md:mt-0"></p>
        </div>
      </div>
    </footer>
  );
}
