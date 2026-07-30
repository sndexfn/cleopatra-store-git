"use client";
import { useState, useRef } from 'react';
import styles from './page.module.css';
import { supabase } from '@/lib/supabase';
import { MOCK_PRODUCTS, Product } from '@/lib/supabase';
import { Plus, Pencil, Trash2, Upload } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: '', description: '', karat: 21 as 18|21|24,
    weightGrams: '', makingChargeUSD: '', imageUrl: '', inStock: true
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !supabase) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `products/${Date.now()}.${ext}`;
    const { data, error } = await supabase.storage.from('product-images').upload(path, file);
    if (!error && data) {
      const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(path);
      setForm(f => ({ ...f, imageUrl: publicUrl }));
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      name: form.name,
      description: form.description,
      karat: form.karat,
      weightGrams: parseFloat(form.weightGrams),
      makingChargeUSD: parseFloat(form.makingChargeUSD),
      imageUrl: form.imageUrl,
      inStock: form.inStock,
    };

    if (supabase) {
      if (editing) {
        await supabase.from('products').update(payload).eq('id', editing.id);
      } else {
        await supabase.from('products').insert(payload);
      }
    }

    setShowForm(false);
    setEditing(null);
    setForm({ name:'', description:'', karat:21, weightGrams:'', makingChargeUSD:'', imageUrl:'', inStock:true });
    setLoading(false);
  };

  const handleEdit = (p: Product) => {
    setEditing(p);
    setForm({ name:p.name, description:p.description, karat:p.karat, weightGrams:String(p.weightGrams), makingChargeUSD:String(p.makingChargeUSD), imageUrl:p.imageUrl, inStock:p.inStock });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
    if (supabase) await supabase.from('products').delete().eq('id', id);
    setProducts(p => p.filter(x => x.id !== id));
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>إدارة المنتجات</h1>
        <button className={styles.addBtn} onClick={() => { setShowForm(true); setEditing(null); }}>
          <Plus size={18} /> إضافة منتج جديد
        </button>
      </div>

      {showForm && (
        <div className={styles.formOverlay}>
          <div className={styles.formCard}>
            <h2>{editing ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label>اسم المنتج</label>
                  <input required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="مثال: قلادة كليوباترا" />
                </div>
                <div className={styles.field}>
                  <label>العيار</label>
                  <select value={form.karat} onChange={e=>setForm(f=>({...f,karat:parseInt(e.target.value) as 18|21|24}))}>
                    <option value={24}>24 - ذهب خالص</option>
                    <option value={21}>21 - الأكثر رواجاً</option>
                    <option value={18}>18 - مقاوم للخدش</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label>الوزن (غرام)</label>
                  <input required type="number" step="0.1" value={form.weightGrams} onChange={e=>setForm(f=>({...f,weightGrams:e.target.value}))} placeholder="مثال: 25.5" />
                </div>
                <div className={styles.field}>
                  <label>أجرة الصياغة ($)</label>
                  <input required type="number" step="0.5" value={form.makingChargeUSD} onChange={e=>setForm(f=>({...f,makingChargeUSD:e.target.value}))} placeholder="مثال: 150" />
                </div>
              </div>
              <div className={styles.field}>
                <label>الوصف</label>
                <textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} placeholder="وصف المنتج..." rows={3} />
              </div>
              <div className={styles.imageField}>
                <label>صورة المنتج</label>
                {form.imageUrl && <img src={form.imageUrl} alt="preview" className={styles.preview} />}
                <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} style={{display:'none'}} />
                <div className={styles.uploadRow}>
                  <button type="button" className={styles.uploadBtn} onClick={()=>fileRef.current?.click()} disabled={uploading}>
                    <Upload size={16} /> {uploading ? 'جاري الرفع...' : 'رفع صورة'}
                  </button>
                  <span className={styles.hint}>أو</span>
                  <input className={styles.urlInput} value={form.imageUrl} onChange={e=>setForm(f=>({...f,imageUrl:e.target.value}))} placeholder="الصق رابط الصورة هنا" />
                </div>
              </div>
              <div className={styles.checkField}>
                <input type="checkbox" id="inStock" checked={form.inStock} onChange={e=>setForm(f=>({...f,inStock:e.target.checked}))} />
                <label htmlFor="inStock">متاح في المخزون</label>
              </div>
              <div className={styles.formActions}>
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? 'جاري الحفظ...' : (editing ? 'حفظ التعديلات' : 'إضافة المنتج')}
                </button>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.grid}>
        {products.map(p => (
          <div key={p.id} className={styles.productCard}>
            <img src={p.imageUrl} alt={p.name} className={styles.productImg} />
            <div className={styles.productInfo}>
              <h3>{p.name}</h3>
              <p>عيار {p.karat} | {p.weightGrams}غ | أجرة: ${p.makingChargeUSD}</p>
              <span className={p.inStock ? styles.inStock : styles.outStock}>
                {p.inStock ? 'متاح' : 'نفذ'}
              </span>
            </div>
            <div className={styles.productActions}>
              <button onClick={() => handleEdit(p)} className={styles.editBtn}><Pencil size={16} /></button>
              <button onClick={() => handleDelete(p.id)} className={styles.deleteBtn}><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
