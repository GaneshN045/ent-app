// PayoutScreen.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator,
    RefreshControl,
    StyleSheet,
} from 'react-native';
import BankAccountCard from '../components/BankAccountCard';
import AddBankModal from '../components/AddBankModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


type BankAccount = {
    id: number;
    holderName: string;
    bankName: string;
    accountNo: string;
    ifscCode: string;
    verified: boolean;
};

export default function PayoutScreen() {
    const [accounts, setAccounts] = useState<BankAccount[]>([
        {
            id: 1,
            holderName: 'Rajesh Kumar',
            bankName: 'HDFC Bank',
            accountNo: '1234567890',
            ifscCode: 'HDFC0001234',
            verified: true,
        },
        {
            id: 2,
            holderName: 'Priya Sharma',
            bankName: 'State Bank of India',
            accountNo: '9876543210',
            ifscCode: 'SBIN0005678',
            verified: false,
        },
        {
            id: 3,
            holderName: 'Amit Patel',
            bankName: 'Axis Bank',
            accountNo: '5555666677',
            ifscCode: 'UTIB0001122',
            verified: true,
        },
        {
            id: 4,
            holderName: 'Sneha Verma',
            bankName: 'ICICI Bank',
            accountNo: '4433221100',
            ifscCode: 'ICIC0002244',
            verified: false,
        },
        {
            id: 5,
            holderName: 'Manoj Singh',
            bankName: 'Punjab National Bank',
            accountNo: '7788990011',
            ifscCode: 'PUNB0123456',
            verified: true,
        },
        {
            id: 6,
            holderName: 'Neha Gupta',
            bankName: 'Kotak Mahindra Bank',
            accountNo: '1122334455',
            ifscCode: 'KKBK0007788',
            verified: false,
        },
        {
            id: 7,
            holderName: 'Arjun Mehta',
            bankName: 'Bank of Baroda',
            accountNo: '6677889900',
            ifscCode: 'BARB0AHMEDA',
            verified: true,
        },
        {
            id: 8,
            holderName: 'Kavya Reddy',
            bankName: 'Union Bank of India',
            accountNo: '2233445566',
            ifscCode: 'UBIN0534678',
            verified: false,
        },
        {
            id: 9,
            holderName: 'Vikas Deshmukh',
            bankName: 'Canara Bank',
            accountNo: '9900112233',
            ifscCode: 'CNRB0004455',
            verified: true,
        },
        {
            id: 10,
            holderName: 'Pooja Nair',
            bankName: 'IndusInd Bank',
            accountNo: '3344556677',
            ifscCode: 'INDB0001234',
            verified: false,
        }

    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [filterText, setFilterText] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const maskAccountNo = (accNo: string) =>
        accNo.length <= 4 ? accNo : `XXXX ${accNo.slice(-4)}`;

    // Simulate initial data loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialLoading(false);
        }, 1500);
        
        return () => clearTimeout(timer);
    }, []);

    const handleAddAccount = (newAcc: Omit<BankAccount, 'id' | 'verified'>) => {
        setLoading(true);
        setTimeout(() => {
            setAccounts((prev) => [
                ...prev,
                { ...newAcc, id: prev.length + 1, verified: false },
            ]);
            setLoading(false);
            setShowAddModal(false);
            Alert.alert('Success', 'Bank account added!');
        }, 1000);
    };

    const handleDelete = () => {
        if (!deleteId) return;
        setLoading(true);
        setTimeout(() => {
            setAccounts((prev) => prev.filter((a) => a.id !== deleteId));
            setDeleteId(null);
            setShowDeleteModal(false);
            setLoading(false);
            Alert.alert('Deleted', 'Bank account removed.');
        }, 600);
    };

    const handleVerify = (id: number) => {
        setLoading(true);
        setTimeout(() => {
            setAccounts((prev) =>
                prev.map((a) => (a.id === id ? { ...a, verified: true } : a))
            );
            setLoading(false);
            Alert.alert('Verified', 'Account verified successfully!');
        }, 1200);
    };

    const handleTransfer = (id: number, type: string, amount: string) => {
        if (!amount || parseFloat(amount) <= 0) {
            Alert.alert('Error', 'Enter valid amount');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            const acc = accounts.find((a) => a.id === id);
            Alert.alert(
                'Transfer Success',
                `₹${amount} sent to ${acc?.holderName} via ${type}`
            );
            setLoading(false);
        }, 1500);
    };

    const filteredAccounts = accounts.filter((acc) => {
        if (!filterText) return true;
        const search = filterText.toLowerCase();
        return (
            acc.holderName.toLowerCase().includes(search) ||
            acc.bankName.toLowerCase().includes(search) ||
            acc.accountNo.includes(search) ||
            acc.ifscCode.toLowerCase().includes(search)
        );
    });

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            // Alert.alert('Refreshed', 'List updated!');
        }, 1000);
    };

    if (initialLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50">
                <ActivityIndicator size="large" color="#ef4444" />
                <Text className="text-gray-600 mt-4 text-base">Loading data...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-gray-50">
            {/* Search + Add Row */}
            <View className="bg-white px-5 py-4 shadow-sm">
                <View className="flex-row items-center gap-3">

                    {/* Search Box */}
                    <View className="flex-1">
                        <TextInput
                            className="bg-gray-100 px-4 py-3 rounded-lg text-base placeholder:text-gray-500"
                            placeholder="Search accounts..."
                            value={filterText}
                            onChangeText={setFilterText}
                        />
                    </View>

                    {/* Add Bank Button */}
                    <TouchableOpacity
                        onPress={() => setShowAddModal(true)}
                        className="bg-white border border-primary px-4 py-3 rounded-lg"
                        activeOpacity={0.8}
                    >
                        <Text className="text-primary font-bold">+ Add Bank</Text>
                    </TouchableOpacity>

                </View>
            </View>


            {/* Cards List */}
            <KeyboardAwareScrollView
                className="flex-1 px-4 pt-4"
                enableOnAndroid={true}
                extraScrollHeight={80}
                extraHeight={150}
                keyboardOpeningTime={0}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >

                {filteredAccounts.length === 0 ? (
                    <View className="items-center py-10">
                        <Text className="text-gray-500 text-lg">No accounts found</Text>
                    </View>
                ) : (
                    filteredAccounts.map((account) => (
                        <BankAccountCard
                            key={account.id}
                            account={account}
                            onVerify={handleVerify}
                            onTransfer={handleTransfer}
                            onDelete={() => {
                                setDeleteId(account.id);
                                setShowDeleteModal(true);
                            }}
                            maskAccountNo={maskAccountNo}
                        />
                    ))
                )}
                <View className="h-20" />
            </KeyboardAwareScrollView>

            {/* Modals */}
            <AddBankModal
                visible={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAdd={handleAddAccount}
            />

            <DeleteConfirmModal
                visible={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
            />

            {/* Loading */}
            {loading && (
                <View className="absolute inset-0 bg-black/40 justify-center items-center z-50">
                    <ActivityIndicator size="large" color="#ef4444" />
                </View>
            )}
        </View>
    );
}