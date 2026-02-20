// import { useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Upload, FileText, Loader2, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { useToast } from '@/hooks/use-toast';
// import { uploadCSV } from '@/services/upload';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';

// export default function UploadPage() {
//   const [file, setFile] = useState<File | null>(null);
//   const [dragging, setDragging] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const handleFile = (f: File) => {
//     if (!f.name.endsWith('.csv')) {
//       toast({ title: 'Invalid file', description: 'Please upload a CSV file.', variant: 'destructive' });
//       return;
//     }
//     setFile(f);
//   };

//   const onDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setDragging(false);
//     if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
//   }, []);

//   const onUpload = async () => {
//     if (!file) return;
//     setLoading(true);
//     try {
//       const result = await uploadCSV(file);
//       navigate('/dashboard', { state: { uploadResult: result } });
//     } catch {
//       toast({ title: 'Upload failed', description: 'Could not connect to the backend server.', variant: 'destructive' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen flex-col">
//       <Navbar />
//       <main className="flex flex-1 items-center justify-center px-4 py-16">
//         <Card className="w-full max-w-lg rounded-xl shadow-md">
//           <CardContent className="p-8">
//             <h1 className="text-2xl font-bold text-foreground">Upload Dataset</h1>
//             <p className="mt-1 text-sm text-muted-foreground">Upload a CSV file to generate analytics</p>

//             <div
//               onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
//               onDragLeave={() => setDragging(false)}
//               onDrop={onDrop}
//               className={`mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors ${
//                 dragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
//               }`}
//               onClick={() => document.getElementById('csv-input')?.click()}
//             >
//               <Upload className="h-10 w-10 text-muted-foreground" />
//               <p className="mt-3 text-sm font-medium text-foreground">
//                 Drag & drop your CSV file here
//               </p>
//               <p className="mt-1 text-xs text-muted-foreground">or click to browse</p>
//               <input
//                 id="csv-input"
//                 type="file"
//                 accept=".csv"
//                 className="hidden"
//                 onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
//               />
//             </div>

//             {file && (
//               <div className="mt-4 flex items-center justify-between rounded-lg bg-muted px-4 py-3">
//                 <div className="flex items-center gap-2">
//                   <FileText className="h-4 w-4 text-primary" />
//                   <span className="text-sm font-medium text-foreground">{file.name}</span>
//                 </div>
//                 <button onClick={() => setFile(null)} className="text-muted-foreground hover:text-foreground">
//                   <X className="h-4 w-4" />
//                 </button>
//               </div>
//             )}

//             <Button
//               className="mt-6 w-full"
//               size="lg"
//               disabled={!file || loading}
//               onClick={onUpload}
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   Processing...
//                 </>
//               ) : (
//                 'Generate Visualization'
//               )}
//             </Button>
//           </CardContent>
//         </Card>
//       </main>
//       <Footer />
//     </div>
//   );
// }





import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { uploadCSV } from '@/services/upload';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFile = (f: File) => {
    if (!f.name.endsWith('.csv')) {
      toast({ title: 'Invalid file', description: 'Please upload a CSV file.', variant: 'destructive' });
      return;
    }
    setFile(f);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const result = await uploadCSV(file);
      navigate('/dashboard', { state: { uploadResult: result } });
    } catch {
      toast({ title: 'Upload failed', description: 'Could not connect to the backend server.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <Card className="w-full max-w-lg rounded-xl shadow-md">
        <CardContent className="p-8">
          <h1 className="text-2xl font-bold text-foreground">Upload Dataset</h1>
          <p className="mt-1 text-sm text-muted-foreground">Upload a CSV file to generate analytics</p>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors ${
              dragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
            }`}
            onClick={() => document.getElementById('csv-input')?.click()}
          >
            <Upload className="h-10 w-10 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium text-foreground">
              Drag & drop your CSV file here
            </p>
            <p className="mt-1 text-xs text-muted-foreground">or click to browse</p>
            <input
              id="csv-input"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>

          {file && (
            <div className="mt-4 flex items-center justify-between rounded-lg bg-muted px-4 py-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{file.name}</span>
              </div>
              <button onClick={() => setFile(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <Button
            className="mt-6 w-full"
            size="lg"
            disabled={!file || loading}
            onClick={onUpload}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Generate Visualization'
            )}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}