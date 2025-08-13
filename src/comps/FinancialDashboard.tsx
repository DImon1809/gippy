import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

// import AIChatView from "./AIChatView";
// import ContactsManager from "./ContactsManager";
// import FinancialSidebarDark from "./FinancialSidebarDark";
// import FinancialSidebarLight from "./FinancialSidebarLight";
// import NameInputModal from "./NameInputModal";
// import SettingsModal from "./SettingsModal";
// import TransactionsDashboard from "./TransactionsDashboard";
// import WalletDashboard from "./WalletDashboard";
// import { useLanguage } from "../contexts/LanguageContext";
// import { useTheme } from "../contexts/ThemeContext";
import { useWallet } from "../shared/api/hooks/useWallet";

interface FinancialDashboardProps {
  className?: string;
}

const FinancialDashboard: React.FC<FinancialDashboardProps> = ({
  className = "",
}) => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState("chat");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const {
    isConnected,
    isConnecting,
    address,
    error,
    showNameModal,
    userName,
    connectWallet,
    disconnectWallet,
    verifyStoredLogin,
    submitUserName,
    closeNameModal,
  } = useWallet();

  const isDarkMode = theme === "dark";
  const isEnglish = language === "en";

  // Отладочная информация
  console.log("FinancialDashboard - Состояние кошелька:", {
    isConnected,
    address,
    userName,
  });

  // Проверяем сохраненный логин при загрузке
  useEffect(() => {
    verifyStoredLogin();
  }, [verifyStoredLogin]);

  const statsData = [
    { title: t("total_balance"), value: "$124,567.89", change: "+12.5%" },
    { title: t("active_positions"), value: "8", change: "+2" },
    { title: t("monthly_profit"), value: "$8,432.10", change: "+18.2%" },
    { title: t("transactions_count"), value: "156", change: "+24" },
    { title: t("contacts_count"), value: "42", change: "+5" },
    { title: t("support_tickets"), value: "3", change: "-1" },
  ];

  const handleSectionChange = (section: string) => {
    if (section === "settings") {
      setIsSettingsOpen(true);
    } else {
      setActiveSection(section);
    }
  };

  const handleWalletAction = async () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      await connectWallet();
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div
      className={`${
        ("flex h-screen w-full transition-all duration-300",
        isDarkMode ? "bg-slate-950" : "bg-slate-50",
        className)
      }`}
    >
      {/* Sidebar */}
      {isDarkMode ? (
        <FinancialSidebarDark
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          isConnected={isConnected}
          userName={userName}
        />
      ) : (
        <FinancialSidebarLight
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          isConnected={isConnected}
          userName={userName}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "absolute top-4 right-4 z-40 px-4 py-2 rounded-lg text-sm font-medium",
              isDarkMode
                ? "bg-red-900/90 text-red-200 border border-red-800"
                : "bg-red-100 text-red-700 border border-red-300"
            )}
          >
            {error}
          </motion.div>
        )}

        {/* Content based on active section */}
        {activeSection === "chat" && (
          <AIChatView
            isDarkMode={isDarkMode}
            className="flex-1 h-full"
            isConnected={isConnected}
            address={address}
            onWalletAction={handleWalletAction}
            isConnecting={isConnecting}
            userName={userName}
          />
        )}

        {activeSection === "transactions" && (
          <div className="flex-1 overflow-y-auto">
            <TransactionsDashboard className="p-8" />
          </div>
        )}

        {activeSection === "contacts" && (
          <div className="flex-1 overflow-hidden">
            <ContactsManager
              isDarkMode={isDarkMode}
              className="h-full"
              isEnglish={isEnglish}
            />
          </div>
        )}

        {activeSection === "wallet" && (
          <div className="flex-1 overflow-y-auto">
            <WalletDashboard className="p-8" />
          </div>
        )}

        {activeSection !== "chat" &&
          activeSection !== "transactions" &&
          activeSection !== "contacts" &&
          activeSection !== "wallet" && (
            <div className="flex-1 overflow-y-auto">
              <div className="p-8 max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <h1
                    className={cn(
                      "text-4xl font-bold mb-2",
                      isDarkMode ? "text-slate-100" : "text-slate-800"
                    )}
                  >
                    {t("financial_dashboard")}
                  </h1>
                  <p
                    className={cn(
                      "text-lg",
                      isDarkMode ? "text-slate-300" : "text-slate-600"
                    )}
                  >
                    {t("professional_crypto")}
                  </p>
                </motion.div>

                {!isConnected && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={cn(
                      "rounded-xl p-8 border mb-8 text-center",
                      isDarkMode
                        ? "bg-slate-800/30 border-slate-700/50"
                        : "bg-white border-slate-200 shadow-sm"
                    )}
                  >
                    <Wallet
                      className={cn(
                        "h-12 w-12 mx-auto mb-4",
                        isDarkMode ? "text-slate-400" : "text-slate-500"
                      )}
                    />
                    <h2
                      className={cn(
                        "text-2xl font-bold mb-2",
                        isDarkMode ? "text-slate-100" : "text-slate-800"
                      )}
                    >
                      Подключите кошелек
                    </h2>
                    <p
                      className={cn(
                        "text-lg",
                        isDarkMode ? "text-slate-300" : "text-slate-600"
                      )}
                    >
                      Для доступа к функциям платформы необходимо подключить
                      кошелек и подписать сообщение
                    </p>
                  </motion.div>
                )}

                {/* Stats Grid - только если подключен */}
                {isConnected && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                  >
                    {statsData.map((stat, index) => (
                      <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className={cn(
                          "p-6 rounded-xl border backdrop-blur-sm",
                          isDarkMode
                            ? "bg-slate-800/30 border-slate-700/50"
                            : "bg-white border-slate-200 shadow-sm"
                        )}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3
                            className={cn(
                              "text-sm font-medium",
                              isDarkMode ? "text-slate-300" : "text-slate-600"
                            )}
                          >
                            {stat.title}
                          </h3>
                          <span
                            className={cn(
                              "text-xs px-2 py-1 rounded-full",
                              stat.change.startsWith("+")
                                ? isDarkMode
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-green-100 text-green-700"
                                : isDarkMode
                                ? "bg-red-500/20 text-red-400"
                                : "bg-red-100 text-red-700"
                            )}
                          >
                            {stat.change}
                          </span>
                        </div>
                        <p
                          className={cn(
                            "text-2xl font-bold",
                            isDarkMode ? "text-slate-100" : "text-slate-800"
                          )}
                        >
                          {stat.value}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {isConnected && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mt-12"
                  >
                    <div
                      className={cn(
                        "rounded-xl p-8 border",
                        isDarkMode
                          ? "bg-slate-800/30 border-slate-700/50"
                          : "bg-white border-slate-200 shadow-sm"
                      )}
                    >
                      <h2
                        className={cn(
                          "text-2xl font-bold mb-4",
                          isDarkMode ? "text-slate-100" : "text-slate-800"
                        )}
                      >
                        {t("welcome_title")}
                      </h2>
                      <p
                        className={cn(
                          "text-lg leading-relaxed mb-4",
                          isDarkMode ? "text-slate-300" : "text-slate-600"
                        )}
                      >
                        {t("welcome_text")}
                      </p>
                      <div
                        className={cn(
                          "text-sm",
                          isDarkMode ? "text-slate-400" : "text-slate-500"
                        )}
                      >
                        Подключен: {formatAddress(address!)}
                        {userName && (
                          <span className="ml-2">
                            | Пользователь:{" "}
                            <span className="font-semibold">{userName}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Name Input Modal */}
      <NameInputModal
        isOpen={showNameModal}
        onClose={closeNameModal}
        onSubmit={submitUserName}
        title="Добро пожаловать в Gippy!"
        placeholder="Введите ваше имя или псевдоним"
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default FinancialDashboard;
