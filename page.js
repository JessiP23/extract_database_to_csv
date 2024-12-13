'use client'

import React from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import Papa from 'papaparse'


const ExportCsvPage = () => {

    const exportToCsv = async () => {
        const songsRef = collection(db, 'songs');
        const querySnapshot = await getDocs(songsRef);
        const data = querySnapshot.docs.map(doc => doc.data());
        const csvData = Papa.unparse(data);
        const csvBlob = new Blob([csvData], { type: 'text/csv' });
        const csvUrl = URL.createObjectURL(csvBlob);
        const a = document.createElement('a');
        a.href = csvUrl;
        a.download = 'songs.csv';
        a.click();
    }

    const handleExport = async () => {
        await exportToCsv();
    };

    return (
        <div>
            <button onClick={handleExport}>Export to CSV</button>
        </div>
    )
}

export default ExportCsvPage;